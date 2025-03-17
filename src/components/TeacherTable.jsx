import { useState } from 'react'

export default function TeacherTable({ teachers, setTeachers }) {
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', email: '' })
  const [editingTeacher, setEditingTeacher] = useState(null)

  const handleAddTeacher = (e) => {
    e.preventDefault()
    if (newTeacher.name && newTeacher.subject && newTeacher.email) {
      setTeachers([...teachers, { ...newTeacher, id: teachers.length + 1 }])
      setNewTeacher({ name: '', subject: '', email: '' })
    }
  }

  const handleUpdateTeacher = () => {
    setTeachers(teachers.map(t => t.id === editingTeacher.id ? editingTeacher : t))
    setEditingTeacher(null)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Teacher Management</h1>
      
      <form onSubmit={handleAddTeacher} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Teacher Name"
            className="p-2 border rounded"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-2 border rounded"
            value={newTeacher.subject}
            onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Teacher
        </button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTeacher?.id === teacher.id ? (
                    <input
                      type="text"
                      value={editingTeacher.name}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    teacher.name
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTeacher?.id === teacher.id ? (
                    <input
                      type="text"
                      value={editingTeacher.subject}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    teacher.subject
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingTeacher?.id === teacher.id ? (
                    <input
                      type="email"
                      value={editingTeacher.email}
                      onChange={(e) => setEditingTeacher({ ...editingTeacher, email: e.target.value })}
                      className="p-1 border rounded"
                    />
                  ) : (
                    teacher.email
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  {editingTeacher?.id === teacher.id ? (
                    <button
                      onClick={handleUpdateTeacher}
                      className="text-green-600 hover:text-green-900"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingTeacher(teacher)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => setTeachers(teachers.filter(t => t.id !== teacher.id))}
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