import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { SideBar } from "../components/layout/Sidebar";
import { Card } from "../components/data-display/Card";
import { toast } from "react-toastify"

export function Brain() {
  const { hash } = useParams<{ hash: string }>();
  const [content, setContent] = useState<any>(null);
  const [filteredContent, setFilteredContent] = useState<any>([]);

  useEffect(() => {
    async function fetchBrain() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
        console.log('Brain response:', response.data);
        setContent(response.data);
        setFilteredContent(response.data.content);
      } catch (err) {
        console.error("Failed to fetch brain:", err);
      }
    }
    if (hash) fetchBrain();
  }, [hash]);

  if (!content) return <div className="text-white">Loading...</div>;
  

  return (
    <div className="white">
      <SideBar logoutIcon={false} content={content.content} setFilteredContent={setFilteredContent} />
      <div className="min-h-screen p-4 ml-72 bg-white">
        <div className="">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xl font-semibold text-purple-700">{content.username}'s Brain</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-7 p-2 ">
            {filteredContent.map(({ type, link, title }: any, index: any) => (
              <Card key={index} title={title} type={type} link={link} onDelete={() => {
                toast.info("You are not allowed to delete this card.", {
                  toastId: "unique-toast",
                });
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

