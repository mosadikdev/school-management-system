import { useState } from 'react'

export default function StudentTable({ students, onAddStudent, onUpdateStudent, onDeleteStudent }) {
  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    contact: '',
    level: 10,
    section: 1,
    status: 'present'
  });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedStudent = {
      ...newStudent,
      level: Number(newStudent.level)
    };

    if (editingId) {
      onUpdateStudent({ ...processedStudent, id: editingId });
    } else {
      onAddStudent(processedStudent);
    }
    
    setNewStudent({ 
      name: '', 
      contact: '',
      level: 10,
      section: 1,
      status: 'present'
    });
    setEditingId(null);
  }

  const handleEdit = (student) => {
    setNewStudent(student);
    setEditingId(student.id);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
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
            type="email"
            placeholder="Contact Email"
            className="p-2 border rounded"
            value={newStudent.contact}
            onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
            required
          />
          <select
  value={newStudent.level}
  onChange={(e) => setNewStudent({ ...newStudent, level: Number(e.target.value) })}
  className="p-2 border rounded-lg"
  required
>
    <option value="1">Grade 1</option>
    <option value="2">Grade 2</option>
    <option value="3">Grade 3</option>
    <option value="4">Grade 4</option>
    <option value="5">Grade 5</option>
    <option value="6">Grade 6</option>
    <option value="7">Grade 7</option>
    <option value="8">Grade 8</option>
    <option value="9">Grade 9</option>
  <option value="10">Grade 10</option>
  <option value="11">Grade 11</option>
  <option value="12">Grade 12</option>
</select>
          <select
            value={newStudent.section}
            onChange={(e) => setNewStudent({ ...newStudent, section: Number(e.target.value) })}
            className="p-2 border rounded-lg"
            required
          >
            <option value="1">Section A</option>
            <option value="2">Section B</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Student' : 'Add Student'}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Section</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">Grade {student.level}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap">Section {student.section}</td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteStudent(student.id)}
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