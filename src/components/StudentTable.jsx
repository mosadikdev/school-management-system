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
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-4 md:mb-6 text-gray-800 dark:text-gray-200">Student Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <input
            type="text"
            placeholder="Student Name"
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Contact Email"
            className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={newStudent.contact}
            onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
            required
          />
          <select
  value={newStudent.level}
  onChange={(e) => setNewStudent({ ...newStudent, level: Number(e.target.value) })}
  className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
          className="mt-3 w-full md:w-auto text-sm md:text-base bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-800"
        >
          {editingId ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-3 py-2 text-xs md:text-sm">ID</th>
              <th className="px-3 py-2 text-xs md:text-sm">Name</th>
              <th className="px-3 py-2 text-xs md:text-sm">Grade</th>
              <th className="px-3 py-2 text-xs md:text-sm">Contact</th>
              <th className="px-3 py-2 text-xs md:text-sm">Section</th>
              <th className="px-3 py-2 text-xs md:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {students.map((student) => (
              <tr key={student.id} className="dark:bg-gray-800">
              <td className="px-3 py-2 md:px-4 md:py-3 text-sm">{student.id}</td>
              <td className="px-3 py-2 md:px-4 md:py-3 text-sm">{student.name}</td>
                <td className="px-3 py-2 md:px-4 md:py-3 text-sm">Grade {student.level}</td>
                <td className="px-3 py-2 md:px-4 md:py-3 text-sm">{student.contact}</td>
                <td className="px-3 py-2 md:px-4 md:py-3 text-sm">Section {student.section}</td>
                <td className="px-3 py-2 md:px-4 md:py-3 flex flex-col gap-1">
                  <button className="text-blue-600 dark:text-blue-400">Edit</button>
                  <button className="text-red-600 dark:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}