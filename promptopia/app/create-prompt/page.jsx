'use client'
import Form from '@/components/Form'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CreatePrompt = () => {
    const {data : session} = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    const createPrompt = async(e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({ // wtf bug is here, forgot to string-ify
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id,
                })
            });
            if (response.ok) {
                router.push('/');
            }
            
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        ></Form>
    )
}

export default CreatePrompt