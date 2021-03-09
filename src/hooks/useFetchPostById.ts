import axios from 'axios'
import { useQuery } from 'react-query'

import { queryCache } from '../'
import { PostModel } from '../models/postModel'

export const fetchPost = (_, postId) =>
  axios.get<PostModel>(`/api/posts/${postId}`).then((res) => res.data)

export const prefetchPost = (postId: string) => {
  queryCache.prefetchQuery<PostModel>(['posts', String(postId)], fetchPost, {
    staleTime: 5000,
  })
}

export default function useFetchPostById(postId) {
  return useQuery<PostModel>(['posts', postId], fetchPost, {
    placeholderData: () =>
      queryCache.getQueryData<any>('posts')?.find((d) => d.id == postId),
    staleTime: 2000,
  })
}
