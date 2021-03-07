import axios from 'axios'
import { useMutation } from 'react-query'

import { queryCache } from '../'

export default function useCreatePost() {
  return useMutation(
    (values) => axios.post<any>('/api/posts', values).then((res) => res.data),
    {
      onMutate: (values: any) => {
        queryCache.cancelQueries('posts')

        const oldPosts = queryCache.getQueryData<any>('posts')

        queryCache.setQueryData<any>('posts', (old) => {
          return [
            ...old,
            {
              ...values,
              id: Date.now(),
              isPreview: true,
            },
          ]
        })

        return () => queryCache.setQueryData('posts', oldPosts)
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: () => queryCache.invalidateQueries('posts'),
    }
  )
}
