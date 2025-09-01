import { useEffect, useRef, useState } from "react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoIcon } from "../assets/icons/LogoIcon";
import { gsap } from "gsap";
import { signin } from "../services/authService";

export function Signin() {
    const [loading, setLoading] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const boxRef = useRef<HTMLDivElement>(null);

    async function handleSignin() {
        setLoading(true);
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        if (!email) {
            toast.error("Email is required");
            setLoading(false);
            return;
        }
        if (!password) {
            toast.error("Password is required");
            setLoading(false);
            return;
        }

        try {
            const response = await signin({ email, password });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);

            toast.success("Signed in successfully", { position: "top-center" });
            navigate("/dashboard");
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        gsap.fromTo(
            boxRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "back" }
        );
    }, []);

    return (
        <div className="h-screen w-screen bg-[url('/icons/bg-icon.svg')] bg-[length:200px_200px] bg-[position:-100px_-100px] bg-black flex justify-center items-center">
            <div
                ref={boxRef}
                className="bg-gradient-to-t from-black to-gray-900 rounded-2xl min-w-48 p-8 flex flex-col"
            >
                <div className="text-white text-3xl font-bold text-center mb-4 flex justify-center items-center gap-2">
                    <span>Welcome to Brainly</span>
                    <span className="text-purple-300">
                        <LogoIcon />
                    </span>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSignin();
                    }}
                >
                    <div className="mt-2">
                        <div className="m-2">
                            <Input ref={emailRef} placeholder="Email" />
                        </div>
                        <div className="m-2 mt-4">
                            <Input
                                ref={passwordRef}
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    <div className="flex text-white text-sm pt-1 pb-4 p-3 gap-2">
                        <span>New to Brainly?</span>
                        <span
                            className="underline hover:scale-105 active:scale-95 cursor-pointer transition-all"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </span>
                    </div>
                    <div className="mt-3">
                        <Button
                            loading={loading}
                            size="md"
                            variant="primary"
                            text="Sign in"
                            fullWidth={true}
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
