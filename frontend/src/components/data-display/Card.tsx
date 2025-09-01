import { useEffect } from "react";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { ShareIcon } from "../../assets/icons/shareIcon";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { YoutubeIcon2 } from "../../assets/icons/YoutubeIcon2";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  selectedTags?: string[];
  createdAt?: string | Date;
  onDelete: () => void;
}

export function Card({
  title,
  link,
  type,
  selectedTags,
  createdAt,
  onDelete,
}: CardProps) {
  // Load twitter script whenever a twitter card is rendered
  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [type]);

  return (
    <div className="h-fit p-2 md:p-4 md:w-72 rounded-md border flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex justify-center items-center">
            <div className="text-gray-500 pr-2">
              {type === "youtube" ? <YoutubeIcon2 /> : <TwitterIcon />}
            </div>
            <span className="text-black font-semibold text-md">{title}</span>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-gray-500 pr-2 hover:text-black transition-all cursor-pointer active:scale-90">
              <a href={link} target="_blank">
                <ShareIcon size="md" />
              </a>
            </div>
            <div
              className="text-gray-500 hover:text-black transition-all cursor-pointer active:scale-90"
              onClick={onDelete}
            >
              <DeleteIcon />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 h-40 overflow-auto scrollbar-hide">
          {type === "youtube" && (
            <iframe
              className="w-full h-full rounded-md"
              src={link.replace("watch", "embed")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <div className="w-full h-full flex items-center justify-center rounded-md bg-gray-50">
              <blockquote className="twitter-tweet w-full h-full flex items-center justify-center">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="w-full flex flex-row flex-wrap items-center gap-1 pt-4 select-none">
          {selectedTags?.map((tag) => (
            <span
              key={tag}
              className="text-sm border rounded-full px-3 py-1 cursor-pointer active:scale-95 transition-all bg-purple-600 text-purple-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-[13px] text-[#333333] flex justify-start pt-5">
        Created At - {createdAt && new Date(createdAt).toDateString()}
      </div>
    </div>
  );
}
