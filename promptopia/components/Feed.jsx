'use client'
import { useEffect, useState } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  // data.forEach((post) => { console.log(post)})
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tag, setTag] = useState("");
  const filteredPosts = posts.filter((post) => {
    if (searchText === "") return true;
    if (tag) return post.tag == tag;
    return post.creator.email.match(searchText) ||
      post.creator.username.match(searchText) ||
      post.prompt.match(searchText) ||
      post.tag.match(searchText)
  })

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    if (data) setPosts(data)
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
    setTag("");
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'
        onSubmit={(e) => { e.preventDefault() }}
      >
        <input
          type='text'
          placeholder='Search for a tag or an author'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      {/* <p className='desc'>
        Keyword = {searchText}
      </p> */}
      <PromptCardList
        data={filteredPosts}
        handleTagClick={(tag) => { setTag(tag); setSearchText(tag); } }
      />
    </section>
  )
}

export default Feed