import React, { useEffect, useState } from 'react'

const defaultFormValues = {
  title: '',
  body: '',
}

type Props = {
  onSubmit: (values: typeof defaultFormValues) => void
  submitText: string
  clearOnSubmit: boolean
  initialValues: typeof defaultFormValues
}

const PostForm = ({
  onSubmit,
  submitText,
  clearOnSubmit,
  initialValues = defaultFormValues,
}: Props) => {
  const [values, setValues] = useState<{ title: string; body: string }>(
    initialValues
  )

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  const setValue = (field, value) =>
    setValues((old) => ({ ...old, [field]: value }))

  const handleSubmit = (e) => {
    if (clearOnSubmit) setValues(defaultFormValues)

    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <div>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
          required
        />
      </div>
      <br />
      <label htmlFor="body">body</label>
      <div>
        <textarea
          name="body"
          value={values.body}
          onChange={(e) => setValue('body', e.target.value)}
          required
          rows={10}
        />
      </div>
      <br />
      <button type="submit">{submitText}</button>
    </form>
  )
}
export default PostForm
