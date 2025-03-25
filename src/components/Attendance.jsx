import { useState } from 'react'
import { 
  CalendarIcon, 
  UserCircleIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

const initialLevels = [
  {
    id: 1,
    name: 'Grade 10',
    sections: [
      { id: 1, name: 'Section A' },
      { id: 2, name: 'Section B' }
    ]
  },
  {
    id: 2,
    name: 'Grade 11',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  }
]

const initialStudents = [
  { id: 1, name: 'Mohamed', status: 'present', level: 1, section: 1 },
]

export default function Attendance() {
  const [students, setStudents] = useState(initialStudents)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedSection, setSelectedSection] = useState('')

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status: newStatus } : student
    ))
  }

  const filteredStudents = students.filter(student =>
    (!selectedLevel || student.level == selectedLevel) &&
    (!selectedSection || student.section == selectedSection)
  )

  const availableSections = selectedLevel 
    ? initialLevels.find(l => l.id == selectedLevel)?.sections || []
    : []

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Attendance Management</h1>
      
      <div className="mb-6 bg-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-blue-600" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
        </div>

        <div className="relative">
          <select
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value)
              setSelectedSection('')
            }}
            className="w-full p-2 border rounded-lg appearance-none"
          >
            <option value="">Select Level</option>
            {initialLevels.map(level => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </select>
          <ChevronDownIcon className="h-4 w-4 absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full p-2 border rounded-lg appearance-none"
            disabled={!selectedLevel}
          >
            <option value="">Select Section</option>
            {availableSections.map(section => (
              <option key={section.id} value={section.id}>{section.name}</option>
            ))}
          </select>
          <ChevronDownIcon className="h-4 w-4 absolute right-3 top-3.5 text-gray-500 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          Showing: {filteredStudents.length} students
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStudents.map(student => (
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
                      student.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
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

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
          <div>
            <p className="text-2xl font-bold">
              {filteredStudents.filter(s => s.status === 'present').length}
            </p>
            <p className="text-sm text-gray-600">Present</p>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3">
          <XCircleIcon className="h-6 w-6 text-red-600" />
          <div>
            <p className="text-2xl font-bold">
              {filteredStudents.filter(s => s.status === 'absent').length}
            </p>
            <p className="text-sm text-gray-600">Absent</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg flex items-center gap-3">
          <XCircleIcon className="h-6 w-6 text-yellow-600" />
          <div>
            <p className="text-2xl font-bold">
              {filteredStudents.filter(s => s.status === 'late').length}
            </p>
            <p className="text-sm text-gray-600">Late</p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
          <CheckCircleIcon className="h-6 w-6 text-blue-600" />
          <div>
            <p className="text-2xl font-bold">
              {filteredStudents.filter(s => s.status === 'excused').length}
            </p>
            <p className="text-sm text-gray-600">Excused</p>
          </div>
        </div>
      </div>
    </div>
  )
}