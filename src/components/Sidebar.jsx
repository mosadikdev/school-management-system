export default function Sidebar({ activeTab, setActiveTab }) {
    return (
      <div className="w-64 bg-blue-600 min-h-screen p-4">
        <h2 className="text-white text-2xl font-bold mb-8">School Management</h2>
        <nav>
          <button
            onClick={() => setActiveTab('students')}
            className={`w-full text-left p-3 rounded-lg mb-2 ${
              activeTab === 'students' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`w-full text-left p-3 rounded-lg ${
              activeTab === 'teachers' ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'
            }`}
          >
            Teachers
          </button>
        </nav>
      </div>
    )
  }