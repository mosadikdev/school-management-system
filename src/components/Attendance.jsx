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
    name: 'Grade 1',
    sections: [
      { id: 1, name: 'Section A' },
      { id: 2, name: 'Section B' }
    ]
  },
  {
    id: 2,
    name: 'Grade 2',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 3,
    name: 'Grade 3',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 4,
    name: 'Grade 4',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 5,
    name: 'Grade 5',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 6,
    name: 'Grade 6',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 7,
    name: 'Grade 7',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 8,
    name: 'Grade 8',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 9,
    name: 'Grade 9',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 10,
    name: 'Grade 10',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 11,
    name: 'Grade 11',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  },
  {
    id: 12,
    name: 'Grade 12',
    sections: [
      { id: 3, name: 'Section A' }
    ]
  }
]



export default function Attendance({ students, setStudents }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedLevel, setSelectedLevel] = useState('')
  const [selectedSection, setSelectedSection] = useState('')

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    )
  }

  const filteredStudents = students.filter(student =>
    (!selectedLevel || student.level == selectedLevel) &&
    (!selectedSection || student.section == selectedSection)
  )

  const availableSections = selectedLevel 
    ? initialLevels.find(l => l.id == selectedLevel)?.sections || []
    : []

  return (
    <div className="dark:bg-gray-900 dark:text-gray-100 min-h-screen p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Attendance Management</h1>
      
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="flex items-center gap-3">
          <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded-lg w-full dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="relative">
          <select
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(e.target.value)
              setSelectedSection('')
            }}
            className="w-full p-2 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select Level</option>
            {initialLevels.map(level => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </select>
          <ChevronDownIcon className="h-4 w-4 absolute right-3 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full p-2 border rounded-lg appearance-none dark:bg-gray-700 dark:border-gray-600"
            disabled={!selectedLevel}
          >
            <option value="">Select Section</option>
            {availableSections.map(section => (
              <option key={section.id} value={section.id}>{section.name}</option>
            ))}
          </select>
          <ChevronDownIcon className="h-4 w-4 absolute right-3 top-3.5 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          Showing: {filteredStudents.length} students
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredStudents.map(student => (
              <tr key={student.id} className="dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                  <UserCircleIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                  <span className="dark:text-gray-200">{student.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    className={`p-2 rounded-lg ${
                      student.status === 'present' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                      student.status === 'absent' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                      student.status === 'late' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400'
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
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center gap-3">
          <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          <div>
            <p className="text-sm md:text-base font-bold dark:text-green-400">
              {filteredStudents.filter(s => s.status === 'present').length}
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-green-300">Present</p>
          </div>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg flex items-center gap-3">
          <XCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
          <div>
            <p className="text-sm md:text-base font-bold dark:text-red-400">
              {filteredStudents.filter(s => s.status === 'absent').length}
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-red-300">Absent</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg flex items-center gap-3">
          <XCircleIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          <div>
            <p className="text-sm md:text-base font-bold dark:text-yellow-400">
              {filteredStudents.filter(s => s.status === 'late').length}
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-yellow-300">Late</p>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-3">
          <CheckCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm md:text-base font-bold dark:text-blue-400">
              {filteredStudents.filter(s => s.status === 'excused').length}
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-blue-300">Excused</p>
          </div>
        </div>
      </div>
    </div>
  )
}