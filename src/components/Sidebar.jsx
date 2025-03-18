import { 
  AcademicCapIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  BookOpenIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 min-h-screen p-6 flex flex-col">
      <div className="mb-10 px-4">
        <h2 className="text-white text-2xl font-bold flex items-center gap-2">
          <AcademicCapIcon className="h-8 w-8 text-blue-300" />
          <span>EduManage Pro</span>
        </h2>
      </div>

      <nav className="flex-1 space-y-2">
        <button
          onClick={() => setActiveTab('students')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            activeTab === 'students' 
              ? 'bg-blue-700 text-white shadow-lg'
              : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
          }`}
        >
          <UserGroupIcon className="h-6 w-6" />
          <span className="font-medium">Students</span>
        </button>

        <button
          onClick={() => setActiveTab('teachers')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            activeTab === 'teachers' 
              ? 'bg-blue-700 text-white shadow-lg'
              : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
          }`}
        >
          <BookOpenIcon className="h-6 w-6" />
          <span className="font-medium">Teachers</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            activeTab === 'analytics' 
              ? 'bg-blue-700 text-white shadow-lg'
              : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
          }`}
        >
          <ChartBarIcon className="h-6 w-6" />
          <span className="font-medium">Analytics</span>
        </button>

        <div className="border-t border-blue-600/50 my-4"></div>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
            activeTab === 'settings' 
              ? 'bg-blue-700 text-white shadow-lg'
              : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
          }`}
        >
          <Cog6ToothIcon className="h-6 w-6" />
          <span className="font-medium">Settings</span>
        </button>
      </nav>

      <div className="pt-4 border-t border-blue-600/50">
        <button className="w-full flex items-center gap-3 p-3 text-blue-200 hover:bg-blue-700/50 rounded-xl transition-all duration-200">
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}