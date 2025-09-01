import { useRef, useState } from "react";
import { CrossIcon } from "../../assets/icons/CrossIcon";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { toast } from "react-toastify";

const ContentVariants = {
    Youtube: "youtube",
    Twitter: "twitter"
}
type ContentType = typeof ContentVariants[keyof typeof ContentVariants]

// we want this to be a "controlled component" -> Read at last
export function AddContentModal({ open, onClose, refetch }: any) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type, setType] = useState<ContentType>(ContentVariants.Youtube)
    async function addContent() {
        const title = titleRef.current?.value
        const link = linkRef.current?.value
        const embeddedLink = getEmbeddedYouTubeLink(link || "");
        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link: embeddedLink,
                type,
                title,
                selectedTags
            }, {
                headers: {
                    "Authorization": `${localStorage.getItem("token")}`
                }
            })
            toast.success("Content added successfully", {
                position: "top-center"
            })
            refetch()
            onClose()
        } catch (err) {
            console.log("Something went wrnong" + err);

        }
    }

    const tags = ["important", "educational", "political", "timepass", "interesting"];

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            // remove tag
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else {
            // add tag
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return <div>
        {open && <div className="fixed inset-0 z-50 flex justify-center items-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black opacity-70" onClick={onClose} />

            {/* Modal Content */}
            <div className="flex flex-col z-10 bg-white opacity-100 items-center rounded-lg h-fit pb-3 w-80">
                <div className="w-full flex justify-end p-3">
                    <div onClick={onClose} className="group cursor-pointer text-black">
                        <div onClick={onClose} className="group-hover:rotate-[180deg] transition-transform duration-500">
                            <CrossIcon />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <Input ref={titleRef} placeholder={"Title"} className="bg-transparent border-b border-gray-500 focus:border-blue-500 transition-colors outline-none text-black placeholder-gray-500" />
                    <Input ref={linkRef} placeholder={"Link"} className="bg-transparent border-b border-gray-500 focus:border-blue-500 transition-colors outline-none text-black placeholder-gray-500" />
                </div>
                <div className="w-full flex flex-row flex-wrap items-center justify-center space-x-1 space-y-1 pt-3 p-1 select-none">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`text-sm border rounded-full px-3 py-1 cursor-pointer active:scale-95 transition-all ${selectedTags.includes(tag)
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "hover:bg-gray-100"
                                }`}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <div className="w-full flex justify-evenly p-4">
                    <Button size="md" text="Youtube" variant={type == ContentVariants.Youtube ? "primary" : "secondary"} onclick={() => { setType(ContentVariants.Youtube) }} className="hover:scale-105 transition-all" />
                    <Button size="md" text="Twitter" variant={type == ContentVariants.Twitter ? "primary" : "secondary"} onclick={() => { setType(ContentVariants.Twitter) }} className="hover:scale-105 transition-all" />
                </div>
                <div className="flex justify-center p-3 w-full">
                    <Button fullWidth={true} variant="primary" text="Submit" size="md" onclick={addContent} className="hover:scale-95 active:scale-100 transition-all" />
                </div>
            </div>
        </div>}
    </div>
}
function getEmbeddedYouTubeLink(link: string) {
    try {
        const url = new URL(link);

        if (url.hostname === "youtu.be") {
            const videoId = url.pathname.slice(1);
            return `https://www.youtube.com/embed/${videoId}`;
        }

        if (url.hostname.includes("youtube.com")) {
            const videoId = url.searchParams.get("v");
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
            if (url.pathname.startsWith("/embed/")) {
                // Strip time parameter (&t=4s or ?t=...)
                return url.origin + url.pathname; // removes ? or & params
            }
        }
    } catch {
        return link;
    }

    return link;
}


/*
A controlled component is a form element (like <input>, <textarea>, or <select>) whose value is controlled by React state.
eg.
function Controlled() {
  const [text, setText] = useState(""); // React state

  return (
    <input
      value={text} // React controls the value
      onChange={(e) => setText(e.target.value)} // React updates it
    />
  );
}

* Whatever you type is stored in React state (text).
* React decides what appears in the box.
* You can easily add validation, track it, etc.

*/