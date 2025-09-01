import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent() {
    const [contents, setContents] = useState([])

    async function fetchContent() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": `${localStorage.getItem("token")}`
            }
        });
        setContents(response.data.content)
    }

    useEffect(() => {
        fetchContent()
    }, [])

    return { contents,setContents, refetch: fetchContent }
}