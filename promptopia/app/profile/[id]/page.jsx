"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Profile from "@/components/Profile"

const TheirProfile = ({ params }) => {
    const searchParams = useSearchParams()
    const name = searchParams.get('name');
    
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        fetchPosts();
    }, [])

    return (
        <>
            {/* <div>Profile of user with ID: {params.id} and name: {name} </div> */}
            <Profile
                name={name}
                desc={`Welcome to ${name} personalized profile page. Explore their exceptional prompts and be inspired by their imagination`}
                data={posts}
            />
        </>
    )
}

export default TheirProfile