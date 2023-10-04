import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AddTask from '../components/AddTask'

const ProjectDetailsPage = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState()

  const fetchProject = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/${projectId}?_embed=tasks`
    )
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
      <div style={{ marginBottom: '2rem' }}>
        <h2>Tasks</h2>
        <ul>
          {project.tasks.map(task => (
            <li key={task.id} style={{ border: '1px solid black' }}>
              <p>{task.title}</p>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
        <AddTask projectId={project.id} fetchProject={fetchProject} />
      </div>

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
