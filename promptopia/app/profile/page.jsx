'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@/components/Profile"

const MyProfile = () => {
    const {data : session} = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const handleEdit = async (post) => {
        router.push("/update-prompt?id=" + post._id);
        // fetchPosts()
        // const response = await fetch(`/api/prompt/${post._id}/`, {
        //     method: 'PATCH',
        //     body: JSON.stringify(post)
        // })
        // const data = await response.json();
        // console.log("New content: ", data)
        // router.push("/profile")
    }
    const handleDelete = async (post) => {

    }

    const fetchPosts = async() => {
        const response = await fetch("/api/users/" + session?.user.id + "/posts/");
        const data = await response.json();
        setPosts(data)
    }
    useEffect(() => {
        if (session?.user.id) fetchPosts()
    }, [])

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile