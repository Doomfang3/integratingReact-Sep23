import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProjectListPage from './pages/ProjectListPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import NewProjectPage from './pages/NewProjectPage'
import UpdateProjectPage from './pages/UpdateProjectPage'

function App() {
  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/projects' element={<ProjectListPage />} />
        <Route path='/projects/:projectId' element={<ProjectDetailsPage />} />
        <Route path='/projects/new' element={<NewProjectPage />} />
        <Route path='/projects/:projectId/update' element={<UpdateProjectPage />} />

        <Route path='*' element={<h1>404 Page</h1>} />
      </Routes>
    </div>
  )
}

export default App
