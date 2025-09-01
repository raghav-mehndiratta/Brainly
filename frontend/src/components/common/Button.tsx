import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    onclick?: () => void;
    startIcon?: ReactElement; // because its just a component only
    endIcon?: ReactElement;
    loading?: boolean,
    fullWidth?: boolean,
    type?: "submit" | "reset" | "button"; // Because the HTML type attribute for buttons is not any string — it must be one of:
    className?:string
}

export const Button = (props: ButtonProps) => {
    const { variant, size, type, text, onclick, startIcon, endIcon, loading, fullWidth, className } = props;

    // can do this
    const variantStyles = {
        "primary": "bg-purple-300 text-white",
        "secondary": "bg-purple-600 text-purple-300"
    }

    // or this
    const sizeClass =
        size === "sm" ? "text-sm px-0 py-0 md:px-2 md:py-1" :
            size === "md" ? "text-xs md:text-base px-1 py-2 md:px-3 md:py-2" :
                size === "lg" ? "text-lg px-0 py-0 md:px-5 md:py-3" : "";

    const defaultStyles = "rounded-md flex flex-row items-center justify-center"

    return <>
        <button type={type ?? "button"} disabled={loading} onClick={onclick} className={` ${className} ${variantStyles[variant]} ${sizeClass} ${defaultStyles} ${fullWidth ? "w-full flex justify-center items-center" : ""} ${loading ? "opacity-50" : ""}`}>
            {startIcon && <span className="pr-2">{startIcon}</span>}
            {loading ? <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : text}
            {endIcon && <span className="pl-2">{endIcon}</span>}
        </button>
    </>
}
