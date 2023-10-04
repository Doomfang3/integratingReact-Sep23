import { useState } from 'react'

const AddTask = ({ projectId, fetchProject }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const payload = { title, description, projectId }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json',
        },
      })
      console.log(response)
      if (response.ok) {
        const parsed = await response.json()
        console.log(parsed)
        fetchProject()
        setTitle('')
        setDescription('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input value={title} onChange={event => setTitle(event.target.value)} />
      </label>
      <label>
        Description
        <input value={description} onChange={event => setDescription(event.target.value)} />
      </label>
      <button type='submit'>Add task</button>
    </form>
  )
}

export default AddTask
