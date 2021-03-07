import axios from 'axios'
import { useMutation } from 'react-query'

import { queryCache } from '../'
import { PostModel } from '../models/postModel'

export default function useCreatePost() {
  return useMutation(
    (values) =>
      axios.post<PostModel>('/api/posts', values).then((res) => res.data),
    {
      onMutate: (values: any) => {
        queryCache.cancelQueries('posts')

        const oldPosts = queryCache.getQueryData<PostModel[]>('posts')

        queryCache.setQueryData<PostModel[]>('posts', (old) => {
          return [
            ...old,
            {
              ...values,
              id: Date.now(),
              isPreview: true,
            },
          ]
        })

        return () => queryCache.setQueryData<PostModel[]>('posts', oldPosts)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => queryCache.invalidateQueries('posts'),
    }
  )
}
