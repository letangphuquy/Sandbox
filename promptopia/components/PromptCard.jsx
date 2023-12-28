"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
// https://stackoverflow.com/questions/65086108/next-js-link-vs-router-push-vs-a-tag
const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session} = useSession();
  const pathName = usePathname();
  const isSameUser = session?.user.id == post.creator._id;
  // const router = useRouter();
  
  const [copied, setCopied] = useState("");


  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }
  return ( post.creator &&
    <div
      className='prompt_card'
    >
      <div className="flex justify-between items-start gap-5">
        {/* <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={() => { router.push('/profile/' + post.creator._id + '?name=' + post.creator.username) }}
        >
          <Image className="rounded-full object-contain"
            src={post.creator.image}
            width={40}
            height={40}
            alt="user image"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900"> 
              {post.creator.username} 
            </h3>
            <p className="font-inter text-sm text-gray-500"> 
              {post.creator.email} 
            </p>
          </div>
        </div> */}

        <Link 
          className="flex-1 flex justify-start items-center gap-3"
          href = {`/profile/${isSameUser ? "" : post.creator._id + '?name=' + post.creator.username}`}
        >
          <Image className="rounded-full object-contain"
            src={post.creator.image}
            width={40}
            height={40}
            alt="user image"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900"> 
              {post.creator.username} 
            </h3>
            <p className="font-inter text-sm text-gray-500"> 
              {post.creator.email} 
            </p>
          </div>
        </Link>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt  
              ? "/assets/icons/tick.svg" 
              : "/assets/icons/copy.svg" }
            alt="copy button"
            width={18}
            height={18}
          >

          </Image>
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'> {post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => {handleTagClick && handleTagClick(post.tag)}}
      > 
        #{post.tag} 
      </p>

      {isSameUser && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => {handleEdit && handleEdit(post)}}
          >
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => {handleDelete && handleDelete(post)}}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard