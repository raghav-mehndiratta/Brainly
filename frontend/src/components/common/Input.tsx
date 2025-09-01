interface InputProps {
    ref?:any,
    placeholder:string,
    className?:string,
    onChange?:any
}

export function Input({ ref, placeholder, className, onChange }: InputProps) {
    return <div>
        <input onChange={onChange} ref={ref} type="text" placeholder={placeholder} className={`px-4 py-2 rounded w-full outline-none border-0 ${className}`} />
    </div>
}