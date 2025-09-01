import type { ReactElement } from "react"

export function SideBarItem({ text, icon }: {
    text: string,
    icon: ReactElement
}) {
    return <div className="w-52 flex text-black cursor-pointer bg-transparent rounded-md hover:bg-gray-200 transition-all duration-150 p-1 ">
        <div className="p-2">   
            {icon}
        </div>
        <div className="p-2">
            {text}
        </div>
    </div>
}