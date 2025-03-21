import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Settings from './components/Settings'
import StudentTable from './components/StudentTable'
import TeacherTable from './components/TeacherTable'
import Dashboard from './components/Dashboard'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'mohamed', grade: '14', contact: 'mohamed@email.com' },
  ])

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Mr. imad', subject: 'Math', email: 'imad@email.com' },
  ])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route 
            path="/students" 
            element={
              <StudentTable 
                students={students} 
                setStudents={setStudents} 
              />
            } 
          />
          <Route 
            path="/teachers" 
            element={
              <TeacherTable 
                teachers={teachers} 
                setTeachers={setTeachers} 
              />
            } 
          />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App