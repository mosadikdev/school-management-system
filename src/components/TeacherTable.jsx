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
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-gray-200">Teacher Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            type="text"
            placeholder="Teacher Name"
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newTeacher.subject}
            onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
            required
          />
        </div>
        <button className="mt-3 w-full md:w-auto bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded">
          {editingId ? 'Update Teacher' : 'Add Teacher'}
        </button>
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
            <th className="px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm">ID</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm">Name</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm">Subject</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm">Email</th>
              <th className="px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="dark:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{teacher.id}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{teacher.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{teacher.email}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteTeacher(teacher.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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