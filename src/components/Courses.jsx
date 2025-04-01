import { useState } from 'react'
import { BookOpenIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

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
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4 md:mb-6">Course Management</h1>

      <form onSubmit={handleSubmit} className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            type="text"
            placeholder="Course Code"
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Course Name"
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Instructor"
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={newCourse.instructor}
            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Schedule"
            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={newCourse.schedule}
            onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
            required
          />
        </div>
        <button className="mt-3 w-full md:w-auto bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded">
          {editingId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        {courses.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            <BookOpenIcon className="h-12 w-12 mx-auto mb-4" />
            <p>No courses available</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Code</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Course Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Instructor</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Schedule</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-4 text-sm dark:text-gray-300">{course.code}</td>
                  <td className="px-4 py-4 text-sm dark:text-gray-300">{course.name}</td>
                  <td className="px-4 py-4 text-sm dark:text-gray-300">{course.instructor}</td>
                  <td className="px-4 py-4 text-sm dark:text-gray-300">{course.schedule}</td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleEdit(course)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}