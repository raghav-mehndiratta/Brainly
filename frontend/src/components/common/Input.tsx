import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}


// export function Input({ ref, placeholder, className, onChange, type }: InputProps) {
//     return <div>
//         <input type={type} onChange={onChange} ref={ref} placeholder={placeholder} className={`px-4 py-2 rounded w-full outline-none border-0 ${className}`} />
//     </div>
// }

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`
                    w-full px-4 py-2 
                    rounded
                    ${className}
                    `}
                {...props}
            />
        );
    }
)

Input.displayName = "Input"; // just for react dev tools (in debugger)