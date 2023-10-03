import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProjectListPage = () => {
  const [projects, setProjects] = useState([])

  const fetchAllProjects = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`)
    if (response.ok) {
      const allProjects = await response.json()
      setProjects(allProjects)
      console.log(allProjects)
    }
  }

  useEffect(() => {
    fetchAllProjects()
  }, [])

  return (
    <>
      <h1>All the projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ProjectListPage
