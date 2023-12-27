'use client'
import Form from '@/components/Form'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const EditPrompt = () => {
    const {data : session} = useSession()
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get('id')
    
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${postId}`);
            const data = await response.json();
            setPost(data);
        }
        fetchPrompt();
    }, [postId]) // IF DEPENDENCY LIST IS NOT POST ID, THEN THIS WILL GET EXECUTED FIRST AND LEADS TO AN EMPTY ID

    const updatePrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch(`api/prompt/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify(post)
            });
            if (response.ok) {
                router.push('/profile');
            }       
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    }

    return ( session?.user &&
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        ></Form>
    )
}

export default EditPrompt