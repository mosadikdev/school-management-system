import { useState } from 'react'

export default function TeacherTable({ teachers, setTeachers }) {
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', email: '' })

  const handleAddTeacher = (e) => {
    e.preventDefault()
    setTeachers([...teachers, { ...newTeacher, id: teachers.length + 1 }])
    setNewTeacher({ name: '', subject: '', email: '' })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Teacher Management</h1>
      
      {/* Add Teacher Form */}
      <form onSubmit={handleAddTeacher} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Teacher Name"
            className="p-2 border rounded"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-2 border rounded"
            value={newTeacher.subject}
            onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Teacher
        </button>
      </form>

      {/* Teachers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}