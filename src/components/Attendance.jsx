import { useState } from 'react'
import { CalendarIcon, UserCircleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const initialStudents = [
  { id: 1, name: 'Mohamed Ali', status: 'present' },
]

export default function Attendance() {
  const [students, setStudents] = useState(initialStudents)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Attendance Management</h1>
      
      {/* Date Picker */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow flex items-center gap-3">
        <CalendarIcon className="h-6 w-6 text-blue-600" />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map(student => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <UserCircleIcon className="h-6 w-6 text-gray-400" />
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    className={`p-2 rounded-lg ${
                      student.status === 'present' ? 'bg-green-100 text-green-800' :
                      student.status === 'absent' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="excused">Excused</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
          <div>
            <p className="text-2xl font-bold">{
              students.filter(s => s.status === 'present').length
            }</p>
            <p className="text-sm text-gray-600">Present</p>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
          <XCircleIcon className="h-6 w-6 text-red-600" />
          <div>
            <p className="text-2xl font-bold">{
              students.filter(s => s.status === 'absent').length
            }</p>
            <p className="text-sm text-gray-600">Absent</p>
          </div>
        </div>
      </div>
    </div>
  )
}