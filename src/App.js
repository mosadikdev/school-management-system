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
    { 
      id: 1, 
      name: 'mohamed', 
      contact: 'mohamed@email.com',
      level: 11, 
      section: 1,
      status: 'present'
    },
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
    const newStudent = {
      ...student,
      id: Date.now()
    };
    setStudents(prev => [...prev, newStudent]);
    addActivity('student', `New student added: ${student.name}`);
  }


  const handleUpdateStudent = (updatedStudent) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
    addActivity('student', `Student updated: ${updatedStudent.name}`);
  }

  const handleDeleteStudent = (studentId) => {
    setStudents(prev => 
      prev.filter(student => student.id !== studentId)
    );
    addActivity('student', `Student deleted`);
  }

  const handleAddTeacher = (teacher) => {
    const newTeacher = { ...teacher, id: Date.now() }
    setTeachers(prev => [...prev, newTeacher])
    addActivity('teacher', `New teacher added: ${teacher.name}`)
  }
  
  const handleUpdateTeacher = (updatedTeacher) => {
    setTeachers(prev => 
      prev.map(teacher => 
        teacher.id === updatedTeacher.id ? updatedTeacher : teacher
      )
    )
    addActivity('teacher', `Teacher updated: ${updatedTeacher.name}`)
  }
  
  const handleDeleteTeacher = (teacherId) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId))
    addActivity('teacher', `Teacher deleted`)
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
        onAddStudent={handleAddStudent}
        onUpdateStudent={handleUpdateStudent}
        onDeleteStudent={handleDeleteStudent}
      />
            } 
          />
          <Route 
            path="/teachers" 
            element={
              <TeacherTable 
      teachers={teachers} 
      onAddTeacher={handleAddTeacher}
      onUpdateTeacher={handleUpdateTeacher}
      onDeleteTeacher={handleDeleteTeacher}
    />
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <Attendance 
                attendance={attendance} 
                setAttendance={setAttendance}
                students={students}
                setStudents={setStudents}
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
