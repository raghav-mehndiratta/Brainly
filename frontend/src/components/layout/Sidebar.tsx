import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../../assets/icons/LogoIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { YoutubeIcon } from "../../assets/icons/YoutubeIcon";
import { logout } from "../../utils";
import { SideBarItem } from "../common/SidebarItem";
import { AllIcon } from "../../assets/icons/AllIcon";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface SidebarProps {
    logoutIcon: boolean;
    content: any[];
    setFilteredContent: (content: any[]) => void;
}

export function SideBar({ logoutIcon, content, setFilteredContent }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false); // sidebar toggle
    const [selectedFilter, setSelectedFilter] = useState("all");
    const navigate = useNavigate();

    function handleLogout() {
        logout(navigate);
    }

    // Filtering runs automatically when selectedFilter or content changes
    useEffect(() => {
        if (!content || content.length === 0) return;

        if (selectedFilter === "all") {
            setFilteredContent(content);
        } else {
            const filtered = content.filter(
                (item) =>
                    item.type && item.type.toLowerCase() === selectedFilter.toLowerCase()
            );
            setFilteredContent(filtered);
        }
        setIsOpen(false);
    }, [selectedFilter, content, setFilteredContent]);


    return (<>
        {/* Top bar with burger icon (only mobile) */}
        <div className="md:hidden flex items-center pl-4 pt-4">
            <button onClick={() => setIsOpen(true)}>
                <MenuIcon className="w-6 h-6 text-gray-700" />
            </button>
            <span className="ml-3 font-bold text-purple-300 text-lg">Brainly</span>
        </div>

        {/* <div ref={sideBarRef} className="h-screen w-72 fixed top-0 left-0 border-r-2 border-gray-300 pl-4 flex flex-col justify-between"> */}
        {/* Sidebar */}
        <div className={`
          fixed top-0 left-0 h-screen w-72 bg-white z-10 border-r-2 border-gray-300 pl-4 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
        >
            <div>
                {/* Close button (mobile only) */}
                <div className="flex justify-between items-center pr-4 pb-4 pt-4 md:hidden">
                    <span className="text-xl font-semibold text-purple-300 flex items-center gap-1">
                        <LogoIcon />
                        Brainly
                    </span>
                    <button onClick={() => setIsOpen(false)}>
                        <CloseIcon className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
                <div className="">
                    <div className="hidden md:flex items-center text-2xl pt-4 font-semibold text-purple-300">
                        <div className="pr-2">
                            <LogoIcon />
                        </div>
                        <span>Brainly</span>
                    </div>
                    <div className="pt-4 md:pl-4 select-none">
                        <div onClick={() => setSelectedFilter("all")} className={`
                        w-52 rounded-md
                        ${selectedFilter == "all" ? "bg-gray-300" : "bg-transparent"}
                    `} >
                            <SideBarItem text="All" icon={<AllIcon />} />
                        </div>
                        <div onClick={() => setSelectedFilter("twitter")} className={`
                        w-52 rounded-md
                        ${selectedFilter == "twitter" ? "bg-gray-300" : "bg-transparent"}
                    `} >
                            <SideBarItem text="Twitter" icon={<TwitterIcon />} />
                        </div>
                        <div onClick={() => setSelectedFilter("youtube")} className={`
                        w-52 rounded-md
                        ${selectedFilter == "youtube" ? "bg-gray-300" : "bg-transparent"}
                    `} >
                            <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
                        </div>
                    </div>
                </div>
            </div>
            {logoutIcon && (
                <div className="w-full flex justify-end p-4">
                    <span onClick={handleLogout}>
                        <LogoutIcon className="hover:scale-110 duration-200 text-gray-600 hover:text-black active:scale-95 cursor-pointer" />
                    </span>
                </div>
            )}
        </div>
    </>);
}
