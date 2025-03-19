import { useState } from 'react'
import Sidebar from './components/Sidebar'
import StudentTable from './components/StudentTable'
import TeacherTable from './components/TeacherTable'
import Analytics from './components/Analytics'

function App() {
  const [activeTab, setActiveTab] = useState('students')
  const [students, setStudents] = useState([
    { id: 1, name: 'mohamed', grade: '14', contact: 'mohamed@email.com' },
  ])

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Mr. imad', subject: 'Math', email: 'imad@email.com' },
  ])

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8">
        {activeTab === 'students' && (
          <StudentTable students={students} setStudents={setStudents} />
        )}
        {activeTab === 'teachers' && (
          <TeacherTable teachers={teachers} setTeachers={setTeachers} />
        )}
        {activeTab === 'analytics' && <Analytics />}
      </main>
    </div>
  )
}

export default App