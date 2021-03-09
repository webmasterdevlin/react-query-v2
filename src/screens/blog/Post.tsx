import React from 'react'
import { useParams } from 'react-router-dom'

//

import useFetchPostById from '../../hooks/useFetchPostById'

export default function Post() {
  const { postId } = useParams<any>()
  const postQuery: any = useFetchPostById(postId)

  return (
    <>
      {postQuery.isLoading ? (
        <span>Loading...</span>
      ) : postQuery.isError ? (
        postQuery.error.message
      ) : (
        <div>
          <h2>{postQuery.data.title}</h2>
          <p>{postQuery.data.body}</p>
        </div>
      )}
    </>
  )
}
