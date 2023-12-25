import React from 'react'
import Feed from '@/components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-col flex-center'>
        <h1 className='head_text text-center'>
          Love &amp; xquin
          <br className='max-md:hidden'/>
          <span className='orange_gradient'> Discover Now! </span>
        </h1>
        <p className='desc'>
          Life can be tough.  <br/> 
          As a "star", there're so much expectations for me. <br/>
          I have to determine what I need to do and just move on, conquer everything one by one.
        </p>
        <Feed></Feed>
    </section>
  )
}

export default Home
