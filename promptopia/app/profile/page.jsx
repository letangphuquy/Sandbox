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
        fetchPosts()
    }
    const handleDelete = async (post) => {
        if (confirm("Are you sure you want to delete this?")) {
            try {
                await fetch("/api/prompt/" + post._id, { method: "DELETE"});
            } catch (error) {
                console.log("Could not delete")                
            } finally {
                router.push('/profile');
            }
        }
        fetchPosts()
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