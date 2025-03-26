import { 
    UserGroupIcon,
    AcademicCapIcon,
    BookOpenIcon,
    ClockIcon,
    ChartBarIcon,
    CalendarIcon,
    ArrowLeftIcon
  } from '@heroicons/react/24/outline'
  import { Link } from 'react-router-dom'
  import { format, parseISO } from 'date-fns'
  
  export default function Activities({ activities }) {
    const icons = {
      student: <UserGroupIcon className="h-5 w-5 text-blue-600" />,
      teacher: <AcademicCapIcon className="h-5 w-5 text-purple-600" />,
      course: <BookOpenIcon className="h-5 w-5 text-green-600" />,
      system: <ChartBarIcon className="h-5 w-5 text-gray-600" />,
      meeting: <ClockIcon className="h-5 w-5 text-green-600" />,
      event: <CalendarIcon className="h-5 w-5 text-orange-600" />
    }
  
    return (
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">All Activities</h1>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
  
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-4">
            {activities
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map(activity => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="mt-1">
                    {icons[activity.type] || icons.system}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.text}</p>
                    <p className="text-sm text-gray-500">
                      {format(parseISO(activity.timestamp), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }