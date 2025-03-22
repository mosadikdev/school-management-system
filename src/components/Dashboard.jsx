import { 
    UserGroupIcon,
    AcademicCapIcon,
    BookOpenIcon,
    ClockIcon,
    ChartBarIcon,
    ArrowUpRightIcon,
    CalendarIcon,
  } from '@heroicons/react/24/outline'
  import { Link } from 'react-router-dom'
  
  const recentActivities = [
    { id: 1, type: 'student', text: 'New student enrollment - Mohamed Ali', time: '2h ago' },
    { id: 2, type: 'teacher', text: 'Ms. Imad assigned to Math class', time: '4h ago' },
    { id: 3, type: 'meeting', text: 'Staff meeting scheduled', time: '1d ago' },
    { id: 4, type: 'event', text: 'Parent-teacher conference tomorrow', time: '1d ago' },
  ]
  
  export default function Dashboard({ studentCount, teacherCount, courseCount }) {
    // Sample dynamic data - replace with real data from your state
    const upcomingEvents = [
      { date: '2025-03-19', title: 'Sports Day', type: 'event' },
      { date: '2025-03-23', title: 'Mid-term Exams', type: 'exam' },
      { date: '2025-03-25', title: 'Art Exhibition', type: 'event' },
    ]
  
    return (
      <div className="dashboard p-4 sm:p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">School Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="h-4 w-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
  
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<UserGroupIcon className="h-8 w-8 text-blue-600" />}
            title="Total Students"
            value="1"
            trend="12% from last month"
          />
          
          <StatCard 
            icon={<AcademicCapIcon className="h-8 w-8 text-purple-600" />}
            title="Total Teachers"
            value="1"
            trend="1 new this month"
          />
          
          <StatCard 
            icon={<BookOpenIcon className="h-8 w-8 text-green-600" />}
            title="Active Courses"
            value="0"
            subText="0 ongoing"
            iconSub={<ClockIcon className="h-4 w-4" />}
          />
          
          <StatCard 
            icon={<ChartBarIcon className="h-8 w-8 text-orange-600" />}
            title="Attendance Rate"
            value="94%"
            trend="3% improvement"
          />
        </div>
  
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <SectionCard 
              title="Recent Activities"
              actionText="View All"
              actionLink="/activities"
            >
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <ActivityItem key={activity.id} {...activity} />
                ))}
              </div>
            </SectionCard>
          </div>
  
          {/* Quick Actions & Calendar */}
          <div className="space-y-8">
            <SectionCard title="Quick Actions">
              <div className="grid grid-cols-1 gap-3">
                <QuickAction 
                  icon={<UserGroupIcon className="h-6 w-6" />}
                  text="Add New Student"
                  link="/students/new"
                  color="blue"
                />
                <QuickAction 
                  icon={<AcademicCapIcon className="h-6 w-6" />}
                  text="Schedule Class"
                  link="/schedule"
                  color="purple"
                />
                <QuickAction 
                  icon={<ChartBarIcon className="h-6 w-6" />}
                  text="Generate Report"
                  link="/reports"
                  color="green"
                />
                <QuickAction 
                  icon={<BookOpenIcon className="h-6 w-6" />}
                  text="Manage Courses"
                  link="/courses"
                  color="orange"
                />
              </div>
            </SectionCard>
  
            <SectionCard title="Upcoming Events">
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    )
  }
  
  // Reusable Components
  const StatCard = ({ icon, title, value, trend, subText, iconSub }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
      {icon}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {trend ? (
          <div className="flex items-center text-green-600 text-sm">
            <ArrowUpRightIcon className="h-4 w-4" />
            <span>{trend}</span>
          </div>
        ) : (
          <div className="flex items-center text-gray-500 text-sm">
            {iconSub}
            <span>{subText}</span>
          </div>
        )}
      </div>
    </div>
  )
  
  const SectionCard = ({ title, children, actionText, actionLink }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {actionText && (
          <Link to={actionLink} className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
            {actionText} <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </div>
  )
  
  const ActivityItem = ({ type, text, time }) => {
    const icons = {
      student: <UserGroupIcon className="h-5 w-5 text-blue-600" />,
      teacher: <AcademicCapIcon className="h-5 w-5 text-purple-600" />,
      meeting: <ClockIcon className="h-5 w-5 text-green-600" />,
      event: <BookOpenIcon className="h-5 w-5 text-orange-600" />
    }
  
    return (
      <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
        <div className="mt-1">{icons[type]}</div>
        <div>
          <p className="font-medium">{text}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    )
  }
  
  const QuickAction = ({ icon, text, link, color = 'blue' }) => {
    const colors = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
      green: { bg: 'bg-green-50', text: 'text-green-600' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-600' }
    }
  
    return (
      <Link
        to={link}
        className={`p-3 rounded-lg ${colors[color].bg} hover:opacity-90 transition-opacity flex items-center gap-2`}
      >
        <span className={`${colors[color].text}`}>{icon}</span>
        <span className="font-medium">{text}</span>
      </Link>
    )
  }