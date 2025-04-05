import { useState, useEffect } from 'react'
import { formatISO, parseISO, format } from 'date-fns'
import {
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

export default function Schedule({ schedules, setSchedules, teachers }) {
  const [newSchedule, setNewSchedule] = useState({
    datetime: '',
    subject: '',
    teacherId: '',
    location: ''
  })

  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('schedules')
    if (saved) setSchedules(JSON.parse(saved))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const schedule = {
      ...newSchedule,
      id: editingId || Date.now(),
      datetime: new Date(newSchedule.datetime).toISOString()
    }

    const updatedSchedules = editingId
      ? schedules.map(s => s.id === editingId ? schedule : s)
      : [...schedules, schedule]

    setSchedules(updatedSchedules)
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules))

    setNewSchedule({
      datetime: '',
      subject: '',
      teacherId: '',
      location: ''
    })
    setEditingId(null)
  }

  const handleEdit = (schedule) => {
    setNewSchedule({
      ...schedule,
      datetime: format(parseISO(schedule.datetime), "yyyy-MM-dd'T'HH:mm")
    })
    setEditingId(schedule.id)
  }

  const handleDelete = (id) => {
    const filtered = schedules.filter(s => s.id !== id)
    setSchedules(filtered)
    localStorage.setItem('schedules', JSON.stringify(filtered))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Class Schedule</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-gray-500" />
            <input
              type="datetime-local"
              value={newSchedule.datetime}
              onChange={(e) => setNewSchedule({ ...newSchedule, datetime: e.target.value })}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            value={newSchedule.subject}
            onChange={(e) => setNewSchedule({ ...newSchedule, subject: e.target.value })}
            className="p-2 border rounded-lg"
            required
          />

          <select
            value={newSchedule.teacherId}
            onChange={(e) => setNewSchedule({ ...newSchedule, teacherId: e.target.value })}
            className="p-2 border rounded-lg"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Location"
              value={newSchedule.location}
              onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
              className="p-2 border rounded-lg w-full"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Schedule' : 'Add Schedule'}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schedules.map(schedule => {
              const teacher = teachers.find(t => t.id === schedule.teacherId)
              return (
                <tr key={schedule.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {format(parseISO(schedule.datetime), 'PPp')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{schedule.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{teacher?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{schedule.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(schedule.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
