import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Settings from './components/Settings'
import StudentTable from './components/StudentTable'
import TeacherTable from './components/TeacherTable'
import Dashboard from './components/Dashboard'
import Attendance from './components/Attendance'
import Courses from './components/Courses'
import Activities from './components/Activities'
import Schedule from './components/Schedule'
import Reports from './components/Reports'
import Login from './components/Login'

const initialCourses = [
  { id: 1, code: 'MATH101', name: 'Mathematics', instructor: 'Mr. Imad', schedule: 'Mon/Wed 9:00 AM' },
  { id: 2, code: 'SCI201', name: 'Science', instructor: 'Ms. Fatima', schedule: 'Tue/Thu 11:00 AM' },
]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students')
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'mohamed', 
        contact: 'mohamed@email.com',
        level: 1,
        section: 1,
        status: 'present'
      }
    ]
  })

  const [teachers, setTeachers] = useState(() => {
    const saved = localStorage.getItem('teachers')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Mr. imad', subject: 'Math', email: 'imad@email.com' }
    ]
  })

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('courses')
    return saved ? JSON.parse(saved) : initialCourses
  })

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('attendance')
    return saved ? JSON.parse(saved) : []
  })

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('activities')
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        type: 'system', 
        text: 'School Management System initialized', 
        timestamp: new Date().toISOString() 
      }
    ]
  })

  const [schedules, setSchedules] = useState(() => {
    const saved = localStorage.getItem('schedules')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    if (storedAuth) setIsAuthenticated(true)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  // Persist state to localStorage
  useEffect(() => {
    const states = {
      students,
      teachers,
      courses,
      attendance,
      activities,
      schedules
    }
    
    Object.entries(states).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
  }, [students, teachers, courses, attendance, activities, schedules])

  // Activity logger
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

  // Student handlers
  const handleAddStudent = (student) => {
    const newStudent = { ...student, id: Date.now() }
    setStudents(prev => [...prev, newStudent])
    addActivity('student', `New student added: ${student.name}`)
  }

  const handleUpdateStudent = (updatedStudent) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === updatedStudent.id ? updatedStudent : student
      )
    )
    addActivity('student', `Student updated: ${updatedStudent.name}`)
  }

  const handleDeleteStudent = (studentId) => {
    setStudents(prev => prev.filter(student => student.id !== studentId))
    addActivity('student', `Student deleted`)
  }

  // Teacher handlers
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

  // Course handlers
  const handleAddCourse = (course) => {
    const newCourse = { ...course, id: Date.now() }
    setCourses(prev => [...prev, newCourse])
    addActivity('course', `New course added: ${course.name}`)
  }

  const handleUpdateCourse = (updatedCourse) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
      )
    )
    addActivity('course', `Course updated: ${updatedCourse.name}`)
  }

  const handleDeleteCourse = (courseId) => {
    setCourses(prev => prev.filter(course => course.id !== courseId))
    addActivity('course', `Course deleted`)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Navigate to="/" />
          )} 
        />
        
        <Route 
          path="/*" 
          element={isAuthenticated ? (
            <>
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
                      />
                    } 
                  />
                  <Route 
                    path="/courses" 
                    element={
                      <Courses 
                        courses={courses} 
                        onAddCourse={handleAddCourse}
                        onUpdateCourse={handleUpdateCourse}
                        onDeleteCourse={handleDeleteCourse}
                      />
                    } 
                  />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/activities" element={<Activities activities={activities} />} />
                  <Route 
                    path="/schedule"
                    element={
                      <Schedule 
                        schedules={schedules}
                        setSchedules={setSchedules}
                        teachers={teachers}
                      />
                    }
                  />
                  <Route 
                    path="/reports"
                    element={
                      <Reports 
                        students={students}
                        teachers={teachers}
                        courses={courses}
                        attendance={attendance}
                      />
                    }
                  />
                </Routes>
              </main>
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </div>
  )
}

export default App