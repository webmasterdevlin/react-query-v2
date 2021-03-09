import axios from 'axios'
import { useQuery } from 'react-query'

import { queryCache } from '../'
import { PostModel } from '../models/postModel'

const fetchPosts = () =>
  axios.get<PostModel[]>('/api/posts').then((res) => res.data)

export const prefetchPost = (postId: string) => {
  queryCache.prefetchQuery<PostModel[]>(['posts', String(postId)], fetchPosts, {
    staleTime: 5000,
  })
}

export default function useFetchPosts() {
  return useQuery<any>('posts', fetchPosts)
}
