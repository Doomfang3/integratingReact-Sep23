import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectForm from '../components/ProjectForm'

const UpdateProjectPage = () => {
  const { projectId } = useParams()

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

  return (
    <>
      <h1>Update Project</h1>
      <ProjectForm isUpdate project={project} />
    </>
  )
}

export default UpdateProjectPage
