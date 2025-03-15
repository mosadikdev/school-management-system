import { useState } from 'react'

export default function StudentTable({ students, setStudents }) {
  const [newStudent, setNewStudent] = useState({ name: '', grade: '', contact: '' })

  const handleAddStudent = (e) => {
    e.preventDefault()
    setStudents([...students, { ...newStudent, id: students.length + 1 }])
    setNewStudent({ name: '', grade: '', contact: '' })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Management</h1>
      
      {/* Add Student Form */}
      <form onSubmit={handleAddStudent} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Student Name"
            className="p-2 border rounded"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Grade"
            className="p-2 border rounded"
            value={newStudent.grade}
            onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
          />
          <input
            type="email"
            placeholder="Contact Email"
            className="p-2 border rounded"
            value={newStudent.contact}
            onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Student
        </button>
      </form>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}