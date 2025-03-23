import { useState } from 'react'
import { BookOpenIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

const initialCourses = [
  { id: 1, code: 'MATH101', name: 'Mathematics', instructor: 'Mr. Imad', schedule: 'Mon/Wed 9:00 AM' },
  { id: 2, code: 'SCI201', name: 'Science', instructor: 'Ms. Fatima', schedule: 'Tue/Thu 11:00 AM' },
]

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses)
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
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Course Management</h1>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Course Code"
            className="p-2 border rounded-lg"
            value={newCourse.code}
            onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Course Name"
            className="p-2 border rounded-lg"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Instructor"
            className="p-2 border rounded-lg"
            value={newCourse.instructor}
            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Schedule"
            className="p-2 border rounded-lg"
            value={newCourse.schedule}
            onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          {editingId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      {/* Courses Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schedule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {courses.map(course => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">{course.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.instructor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.schedule}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="text-red-600 hover:text-red-900"
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