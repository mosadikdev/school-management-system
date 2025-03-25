import { useState } from 'react'

export default function TeacherTable({ teachers, onAddTeacher, onUpdateTeacher, onDeleteTeacher }) {
  const [newTeacher, setNewTeacher] = useState({ 
    name: '', 
    subject: '', 
    email: '' 
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      onUpdateTeacher({ ...newTeacher, id: editingId });
    } else {
      onAddTeacher(newTeacher);
    }
    setNewTeacher({ name: '', subject: '', email: '' });
    setEditingId(null);
  }

  const handleEdit = (teacher) => {
    setNewTeacher(teacher);
    setEditingId(teacher.id);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Teacher Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
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
          {editingId ? 'Update Teacher' : 'Add Teacher'}
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
                <td className="px-6 py-4 whitespace-nowrap">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{teacher.email}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTeacher(teacher.id)}
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