import { Cog6ToothIcon, ShieldCheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function Settings() {
  const [schoolName, setSchoolName] = useState('Ecole Alnasr')
  const [schoolAddress, setSchoolAddress] = useState('123 Hay Hassani, Casablanca')
  const [academicYear, setAcademicYear] = useState('2024-2025')
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState(true)

  const handleSchoolInfoSubmit = (e) => {
    e.preventDefault()
    console.log('School info updated')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    console.log('Password changed')
  }

  return (
    <div className="settings-page">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">System Settings</h1>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Cog6ToothIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold">School Information</h2>
        </div>

        <form onSubmit={handleSchoolInfoSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              value={schoolAddress}
              onChange={(e) => setSchoolAddress(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update School Info
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Cog6ToothIcon className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Preferences</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Theme</h3>
              <p className="text-sm text-gray-500">Choose light or dark mode</p>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-2 border rounded-lg"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-500">Receive system notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheckIcon className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold">Security</h2>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Change Password
          </button>
        </form>
      </div>

      <div className="bg-red-50 rounded-xl shadow-sm p-6 border border-red-200">
        <div className="flex items-center gap-3 mb-6">
          <TrashIcon className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-white">
            <div>
              <h3 className="font-medium">Delete Account</h3>
              <p className="text-sm text-gray-500">Permanently delete your school account</p>
            </div>
            <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}