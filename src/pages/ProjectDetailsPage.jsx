import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProjectDetailsPage = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState()

  const fetchProject = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}`)
    if (response.ok) {
      const project = await response.json()
      setProject(project)
      console.log(project)
    }
  }

  useEffect(() => {
    fetchProject()
  }, [])

  useEffect(() => {
    console.log(project)
  }, [project])

  const handleDelete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${project.id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        const parsed = await response.json()
        console.log(parsed)
        navigate('/projects')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return project ? (
    <>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <Link to={`/projects/${project.id}/update`}>
        <button type='button'>Update</button>
      </Link>
      <button type='button' onClick={handleDelete}>
        Delete
      </button>
    </>
  ) : (
    <>
      <h1>loading...</h1>
    </>
  )
}

export default ProjectDetailsPage
