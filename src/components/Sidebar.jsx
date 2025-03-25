import { NavLink } from 'react-router-dom'
import { 
  AcademicCapIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  BookOpenIcon,
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'

export default function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 min-h-screen p-6 flex flex-col">
      <div className="mb-10 px-4">
        <h2 className="text-white text-2xl font-bold flex items-center gap-2">
          <AcademicCapIcon className="h-8 w-8 text-blue-300" />
          <span>EduManage Pro</span>
        </h2>
      </div>

      <nav className="flex-1 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) => 
            `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'bg-blue-700 text-white shadow-lg'
                : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
            }`
          }
        >
          <ChartBarIcon className="h-6 w-6" />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/students"
          className={({ isActive }) => 
            `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'bg-blue-700 text-white shadow-lg'
                : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
            }`
          }
        >
          <UserGroupIcon className="h-6 w-6" />
          <span className="font-medium">Students</span>
        </NavLink>

        <NavLink
          to="/teachers"
          className={({ isActive }) => 
            `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'bg-blue-700 text-white shadow-lg'
                : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
            }`
          }
        >
          <BookOpenIcon className="h-6 w-6" />
          <span className="font-medium">Teachers</span>
        </NavLink>

        <NavLink
  to="/attendance"
  className={({ isActive }) => 
    `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'bg-blue-700 text-white shadow-lg'
        : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
    }`
  }
>
  <ClipboardDocumentCheckIcon className="h-6 w-6" />
  <span className="font-medium">Attendance</span>
</NavLink>

<NavLink
  to="/courses"
  className={({ isActive }) => 
    `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
      isActive 
        ? 'bg-blue-700 text-white shadow-lg'
        : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
    }`
  }
>
  <BookmarkIcon className="h-6 w-6" />
  <span className="font-medium">Courses</span>
</NavLink>

        <div className="border-t border-blue-600/50 my-4"></div>

        <NavLink
          to="/settings"
          className={({ isActive }) => 
            `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'bg-blue-700 text-white shadow-lg'
                : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
            }`
          }
        >
          <Cog6ToothIcon className="h-6 w-6" />
          <span className="font-medium">Settings</span>
        </NavLink>
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