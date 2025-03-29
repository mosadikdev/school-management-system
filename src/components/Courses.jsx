import { useState } from 'react'
import { BookOpenIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const initialCourses = [
  { id: 1, code: 'MATH101', name: 'Mathematics', instructor: 'Mr. Imad', schedule: 'Mon/Wed 9:00 AM' },
  { id: 2, code: 'SCI201', name: 'Science', instructor: 'Ms. Fatima', schedule: 'Tue/Thu 11:00 AM' },
]

export default function Courses({ courses, setCourses }) {
  const [newCourse, setNewCourse] = useState({ code: '', name: '', instructor: '', schedule: '' })
  const [editingId, setEditingId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      setCourses(courses.map(course => 
        course.id === editingId ? { ...newCourse, id: editingId } : course
      ))
    } else {
      setCourses([...courses, { ...newCourse, id: Date.now() }])
    }
    setNewCourse({ code: '', name: '', instructor: '', schedule: '' })
    setEditingId(null)
  }

  const handleEdit = (course) => {
    setNewCourse(course)
    setEditingId(course.id)
  }

  const handleDelete = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId))
  }

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Course Management</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Course Code"
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Course Name"
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Instructor"
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={newCourse.instructor}
            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Schedule"
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            value={newCourse.schedule}
            onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          {editingId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Schedule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {courses.map(course => (
              <tr key={course.id} className="dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{course.code}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{course.instructor}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{course.schedule}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => {
                      setNewCourse(course)
                      setEditingId(course.id)
                    }}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCourses(courses.filter(c => c.id !== course.id))}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}