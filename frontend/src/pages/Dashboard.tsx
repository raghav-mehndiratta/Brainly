import { Button } from "../components/common/Button"
import { PlusIcon } from "../assets/icons/plusIcon"
import { ShareIcon } from "../assets/icons/shareIcon"
import { Card } from "../components/data-display/Card"
import { AddContentModal } from "../components/data-display/AddContentModal"
import { SideBar } from "../components/layout/Sidebar"
import { useEffect, useRef, useState } from "react"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL, FRONTEND_URL } from "../config"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { gsap } from "gsap";

function Dashboard() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate()

    useEffect(() => { // we can't just directly navigate while rendering phase is going on -> that's why useEffect is being used here
        if (!token) {
            navigate("/signin");
            return;
        }
    }, []);
    const [modalOpen, setModalOpen] = useState(false)
    const { contents, setContents, refetch }: any = useContent();
    const [filteredContent, setFilteredContent] = useState<any[]>([]);
    const deleteCard = async (contentId: string) => {
        try {
            await axios.request({
                url: `${BACKEND_URL}/api/v1/content/`,
                method: "DELETE",
                headers: {
                    Authorization: localStorage.getItem("token")
                },
                data: {
                    contentId
                }
            })
            // Update contents
            setContents((prev: any[]) => prev.filter(item => item._id !== contentId));
            toast.success("Content deleted successfully", {
                position: "top-center"
            });
        } catch (err) {
            console.error("Error deleting content:", err);
            toast.error("Failed to delete content", {
                position: "top-center"
            });
        }
    }

    const sideBarRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        gsap.fromTo(
            sideBarRef.current,
            { x: -100, opacity: 1 }, // starting values
            { x: 0, opacity: 1, duration: 0.5, ease: "" } // ending values
        );
    }, []);
    useEffect(() => {
        gsap.fromTo(
            heroRef.current,
            { y: 100 },
            { y: 0, duration: 0.5, ease: "" }
        );
    }, []);

    useEffect(() => {
        setFilteredContent(contents);
    }, [contents]);

    return <>
        <div className="md:flex md:flex-row md:items-start">
            <div className="flex flex-row justify-between">
                <SideBar logoutIcon={true} content={contents} setFilteredContent={setFilteredContent} />
                <div className="flex md:hidden gap-2 mt-4 pr-2">
                    <Button variant="primary" size="md" text="Add Content" onClick={() => { setModalOpen(true) }} startIcon={<PlusIcon size="md" />} className="transition-all md:hover:scale-105 active:scale-95" ></Button>
                    <Button variant="secondary" size="md" text="Share Brain" onClick={shareBrain} startIcon={<ShareIcon size="md" />} className="transition-all md:hover:scale-105 active:scale-95" ></Button>
                </div>
            </div>
            <div className="min-h-screen w-full">
                <div className="w-full">
                    <div className="w-full flex justify-end md:justify-between items-center gap-4">
                        <div className="hidden md:block text-md md:text-xl font-semibold pl-4">
                            {contents.length > 0 && contents[0]?.userId?.username} {contents.length > 0 && <span className="text-purple-300 font-semibold">'s Brain</span>}
                        </div>
                        <div className="md:flex hidden md:gap-4 gap-2 pt-4 pr-2">
                            <Button variant="primary" size="md" text="Add Content" onClick={() => { setModalOpen(true) }} startIcon={<PlusIcon size="md" />} className="transition-all md:hover:scale-105 active:scale-95" ></Button>
                            <Button variant="secondary" size="md" text="Share Brain" onClick={shareBrain} startIcon={<ShareIcon size="md" />} className="cursor-not-allowed transition-all md:hover:scale-105 active:scale-95" ></Button>
                        </div>
                    </div>
                    <div ref={heroRef} className="flex flex-row flex-wrap gap-2 md:gap-4 mt-7 p-4">
                        {filteredContent.map(({ _id, type, link, title, selectedTags, createdAt }) => (
                            <Card key={_id} title={title} type={type} link={link} selectedTags={selectedTags} createdAt={createdAt} onDelete={() => { deleteCard(_id) }} />
                        ))}
                    </div>
                </div>
                <AddContentModal
                    open={modalOpen}
                    onClose={() => { setModalOpen(false) }}
                    refetch={refetch}
                />
            </div>
        </div>
    </>
}

async function shareBrain() {
    toast.info("This feature is currently under development", {
        position: "top-center"
    })
    return;
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: true
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        const shareUrl = `${FRONTEND_URL}/brain/${response.data.hash}`
        navigator.clipboard.writeText(shareUrl).then(() => {
            toast.success("Link copied", {
                position: "bottom-center",
            })
        }).catch((err => {
            toast.error("Something went wrong")
            console.log(err);
        }))
    } catch (err) {
        console.error('Share brain error:', err);
        toast.error("Something went wrong", {
            position: "top-center"
        })
    }
}
export default Dashboard
