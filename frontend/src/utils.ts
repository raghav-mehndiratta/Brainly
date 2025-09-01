import { toast } from "react-toastify"

export function logout(navigate : any) {
    try {
        localStorage.removeItem("token")
        toast("Logged out", {
            position: "top-center"
        })
        navigate("/signin")
        return
    } catch (err) {
        console.log(err);
    }
}