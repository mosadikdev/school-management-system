import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useMemo, useState } from 'react'
import { 
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon 
} from '@heroicons/react/24/outline'
import { format, parseISO } from 'date-fns'
import { saveAs } from 'file-saver'

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function Reports({ students, teachers, courses, attendance }) {
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date()
  })

  const processedAttendance = useMemo(() => {
    return attendance.filter(record => 
      new Date(record.date) >= dateRange.start &&
      new Date(record.date) <= dateRange.end
    )
  }, [attendance, dateRange])

  const chartData = useMemo(() => {
    return Object.entries(
      processedAttendance.reduce((acc, record) => {
        const week = `Week ${Math.ceil(new Date(record.date).getDate() / 7)}`
        acc[week] = acc[week] || { present: 0, absent: 0 }
        acc[week][record.status]++
        return acc
      }, {})
    ).map(([week, counts]) => ({ week, ...counts }))
  }, [processedAttendance])

  const gradeDistribution = useMemo(() => {
    const grades = students.reduce((acc, student) => {
      acc[student.level] = (acc[student.level] || 0) + 1
      return acc
    }, {})
    return Object.entries(grades).map(([grade, count]) => ({
      name: `Grade ${grade}`,
      students: count
    }))
  }, [students])

  const subjectDistribution = useMemo(() => {
    return Object.entries(
      teachers.reduce((acc, teacher) => {
        acc[teacher.subject] = (acc[teacher.subject] || 0) + 1
        return acc
      }, {})
    ).map(([subject, count]) => ({ subject, teachers: count }))
  }, [teachers])

  const courseEnrollment = useMemo(() => {
    return courses.map(course => ({
      name: course.name,
      students: course.students?.length || 0
    }))
  }, [courses])

  const handleExport = (chartId, title) => {
    const canvas = document.querySelector(`#${chartId} canvas`)
    canvas.toBlob(blob => {
      saveAs(blob, `${title.replace(/ /g, '_')}.png`)
    })
  }

  return (
    <div className="p-4 sm:p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">System Analytics</h1>
        <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <input
            type="date"
            value={format(dateRange.start, 'yyyy-MM-dd')}
            onChange={e => setDateRange(prev => ({ ...prev, start: parseISO(e.target.value) }))}
            className="p-2 border rounded-lg text-sm"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={format(dateRange.end, 'yyyy-MM-dd')}
            onChange={e => setDateRange(prev => ({ ...prev, end: parseISO(e.target.value) }))}
            className="p-2 border rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Attendance Trends"
          icon={<ChartBarIcon className="h-6 w-6 text-blue-600" />}
          chartId="attendance-chart"
          onExport={handleExport}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="present" name="Present Students" fill="#10B981" />
              <Bar dataKey="absent" name="Absent Students" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Student Distribution"
          icon={<UserGroupIcon className="h-6 w-6 text-purple-600" />}
          chartId="grade-distribution"
          onExport={handleExport}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gradeDistribution}
                dataKey="students"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {gradeDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Teacher Specializations"
          icon={<AcademicCapIcon className="h-6 w-6 text-green-600" />}
          chartId="subject-chart"
          onExport={handleExport}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="teachers" name="Teachers" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Course Enrollment"
          icon={<BookOpenIcon className="h-6 w-6 text-orange-600" />}
          chartId="course-chart"
          onExport={handleExport}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseEnrollment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="students" name="Enrolled Students" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}

const ChartCard = ({ title, icon, children, chartId, onExport }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg relative group">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <button
        onClick={() => onExport(chartId, title)}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900"
        title="Download Chart"
      >
        <ArrowDownTrayIcon className="h-5 w-5" />
      </button>
    </div>
    <div id={chartId} className="w-full h-[300px]">
      {children}
    </div>
  </div>
)

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}