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
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([]);

  const criteria = { tag: "", keyword: "" }

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", {
      method: 'GET',
      body: JSON.stringify(criteria)
    });
    const data = await response.json();
    if (data) setPosts(data)
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleSearchChange = (e) => {
    e.preventDefault();
    if (keyword !== searchText) {
      setSearchText(e.target.value);
      keyword = searchText;
      fetchPosts();
    }
  }

  const handleTagClick = (tag) => {
    criteria.tag = tag;
    fetchPosts();
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or an author'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed