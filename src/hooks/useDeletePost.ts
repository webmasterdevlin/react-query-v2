import axios from 'axios'
import { useMutation } from 'react-query'

import { queryCache } from '../'
import { PostModel } from '../models/postModel'

export default function useDeletePost() {
  return useMutation(
    (postId) =>
      axios.delete<void>(`/api/posts/${postId}`).then((res) => res.data),
    {
      onError: (error, variables, rollback: any) => {
        rollback && rollback()
      },
      onSuccess: (data, postId) => {
        const previousPosts = queryCache.getQueryData<PostModel[]>('posts')

        const optimisticPosts = previousPosts.filter((d) => d.id !== postId)

        queryCache.setQueryData('posts', optimisticPosts)
        queryCache.invalidateQueries('posts')
      },
    }
  )
}
