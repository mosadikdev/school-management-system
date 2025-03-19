import { UsersIcon, BookOpenIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline'




export default function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <UsersIcon className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Students</p>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <AcademicCapIcon className="h-8 w-8 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Teachers</p>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <BookOpenIcon className="h-8 w-8 text-orange-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Courses</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <ChartBarIcon className="h-8 w-8 text-purple-600" />
          <div>
            <p className="text-gray-500 text-sm">Attendance</p>
            <p className="text-2xl font-bold">92%</p>
          </div>
        </div>
      </div>

      
    </div>
  )
}