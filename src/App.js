import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Settings from './components/Settings'
import StudentTable from './components/StudentTable'
import TeacherTable from './components/TeacherTable'
import Dashboard from './components/Dashboard'
import Attendance from './components/Attendance'
import Courses from './components/Courses'


const initialCourses = [
  { id: 1, code: 'MATH101', name: 'Mathematics', instructor: 'Mr. Imad', schedule: 'Mon/Wed 9:00 AM' },
  { id: 2, code: 'SCI201', name: 'Science', instructor: 'Ms. Fatima', schedule: 'Tue/Thu 11:00 AM' },
]

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'mohamed', grade: '14', contact: 'mohamed@email.com' },
  ])

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Mr. imad', subject: 'Math', email: 'imad@email.com' },
  ])

  const [courses, setCourses] = useState(initialCourses)
  const [attendance, setAttendance] = useState([])
  const [activities, setActivities] = useState([
    { 
      id: 1, 
      type: 'system', 
      text: 'School Management System initialized', 
      timestamp: new Date().toISOString() 
    }
  ])

  const addActivity = (type, text) => {
    setActivities(prev => [
      ...prev,
      {
        id: Date.now(),
        type,
        text,
        timestamp: new Date().toISOString()
      }
    ])
  }

  const handleAddStudent = (student) => {
    setStudents(prev => [...prev, student])
    addActivity('student', `New student added: ${student.name}`)
  }

  const handleAddTeacher = (teacher) => {
    setTeachers(prev => [...prev, teacher])
    addActivity('teacher', `New teacher added: ${teacher.name}`)
  }



  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard
                studentCount={students.length}
                teacherCount={teachers.length}
                courseCount={courses.length}
                attendanceRecords={attendance}
                recentActivities={activities}
              />
            } 
          />
          <Route 
            path="/students" 
            element={
              <StudentTable 
                students={students} 
                setStudents={handleAddStudent} 
              />
            } 
          />
          <Route 
            path="/teachers" 
            element={
              <TeacherTable 
                teachers={teachers} 
                setTeachers={handleAddTeacher} 
              />
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <Attendance 
                attendance={attendance} 
                setAttendance={setAttendance} 
              />
            } 
          />
          <Route 
            path="/courses" 
            element={
              <Courses 
      courses={courses} 
      setCourses={setCourses} 
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