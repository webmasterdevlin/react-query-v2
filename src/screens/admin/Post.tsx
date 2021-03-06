import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import useFetchPostById from '../../hooks/useFetchPostById'
import useUpdatePost from '../../hooks/useUpdatePost'
import useRemovePost from '../../hooks/useRemovePost'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'

export default function Post() {
  const { postId } = useParams<any>()
  const navigate = useHistory()

  const postQuery = useFetchPostById(postId)
  const [savePost, savePostInfo] = useUpdatePost()
  const [deletePost, deletePostInfo] = useRemovePost()

  const onSubmit = async (values) => {
    savePost(values)
  }

  const onDelete = async () => {
    await deletePost(postId)
    navigate.push('/admin')
  }

  return (
    <>
      {postQuery.isLoading ? (
        <span>
          <Loader /> Loading...
        </span>
      ) : (
        <div>
          <h3>{postQuery.data.title}</h3>
          <p>
            <Link to={`/blog/${postQuery.data.id}`}>View Post</Link>
          </p>
          <PostForm
            initialValues={postQuery.data}
            onSubmit={onSubmit}
            submitText={
              savePostInfo.isLoading
                ? 'Saving...'
                : savePostInfo.isError
                ? 'Error!'
                : savePostInfo.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          />

          <p>
            <button onClick={onDelete}>
              {deletePostInfo.isLoading
                ? 'Deleting...'
                : deletePostInfo.isError
                ? 'Error!'
                : deletePostInfo.isSuccess
                ? 'Deleted!'
                : 'Delete Post'}
            </button>
          </p>
        </div>
      )}
    </>
  )
}
