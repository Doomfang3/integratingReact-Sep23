import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectForm = ({ isUpdate, project }) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = async event => {
    event.preventDefault()
    const payload = { title, description }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects${isUpdate ? `/${project.id}` : ''}`,
        {
          method: isUpdate ? 'PUT' : 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-type': 'application/json',
          },
        }
      )
      console.log(response)
      if (response.ok) {
        const currentProject = await response.json()
        console.log(currentProject)
        navigate(`/projects/${currentProject.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isUpdate && project) {
      setTitle(project.title)
      setDescription(project.description)
    }
  }, [project])

  return (
    <form style={{ display: 'grid', gridTemplate: 'auto / 1fr' }} onSubmit={onSubmit}>
      <label>
        Title
        <input value={title} onChange={event => setTitle(event.target.value)} required />
      </label>
      <label>
        Description
        <input
          value={description}
          onChange={event => setDescription(event.target.value)}
          required
        />
      </label>
      <button type='submit'>{isUpdate ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default ProjectForm
