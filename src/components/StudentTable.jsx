import { useState } from 'react'

export default function StudentTable({ students, setStudents }) {
  const [newStudent, setNewStudent] = useState({ name: '', grade: '', contact: '' })
  const [editingStudent, setEditingStudent] = useState(null)

  const handleAddStudent = (e) => {
    e.preventDefault()
    if (newStudent.name && newStudent.grade && newStudent.contact) {
      setStudents([...students, { ...newStudent, id: students.length + 1 }])
      setNewStudent({ name: '', grade: '', contact: '' })
    }
  }

  const handleUpdateStudent = () => {
    setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s))
    setEditingStudent(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Management</h1>
      
      <form onSubmit={handleAddStudent} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Student Name"
            className="p-2 border rounded"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Grade"
            className="p-2 border rounded"
            value={newStudent.grade}
            onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Contact Email"
            className="p-2 border rounded"
            value={newStudent.contact}
            onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingStudent?.id === student.id ? (
                    <input
                      type="text"
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingStudent?.id === student.id ? (
                    <input
                      type="text"
                      value={editingStudent.grade}
                      onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    student.grade
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingStudent?.id === student.id ? (
                    <input
                      type="email"
                      value={editingStudent.contact}
                      onChange={(e) => setEditingStudent({ ...editingStudent, contact: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    student.contact
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  {editingStudent?.id === student.id ? (
                    <button
                      onClick={handleUpdateStudent}
                      className="text-green-600 hover:text-green-900"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingStudent(student)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => setStudents(students.filter(s => s.id !== student.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
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