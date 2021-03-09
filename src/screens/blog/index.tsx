import React from 'react'
import { Link } from 'react-router-dom'

import useFetchPosts from '../../hooks/useFetchPosts'
import { prefetchPost } from '../../hooks/useFetchPostById'

import { PostStyles } from '../../components/styled'

export default function Home() {
  const postsQuery: any = useFetchPosts()

  return (
    <div>
      <h1>Blog</h1>

      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        `}
      >
        {postsQuery.isLoading ? (
          <span>Loading...</span>
        ) : postsQuery.isError ? (
          postsQuery.error.message
        ) : (
          postsQuery.data.map((post) => (
            <PostStyles
              as={Link}
              to={`./blog/${post.id}`}
              key={post.id}
              onMouseEnter={() => {
                prefetchPost(post.id)
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </PostStyles>
          ))
        )}
      </div>
    </div>
  )
}
