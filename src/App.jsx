import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  DoorOpen, 
  BookOpen,
  Laptop,
  RefreshCw,
  AlertCircle,
  Monitor,
  Printer,
  Projector
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid,  PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';


function AnimatedCounter({ end, duration = 500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
}

function LoadingCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="bg-gray-200 h-12 w-12 rounded-lg"></div>
            <div className="mt-4 h-6 bg-gray-200 rounded w-24"></div>
            <div className="mt-1 h-8 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-12 w-1 bg-gray-200 rounded-full"></div>
        </div>
        <div className="mt-4">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="min-h-[300px] flex items-center justify-center">
      <div className="text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Məlumatları yükləmək mümkün olmadı</h3>
        <p className="text-gray-500 mb-4">Zəhmət olmasa bir az sonra yenidən cəhd edin</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Yenidən cəhd et
        </button>
      </div>
    </div>
  );
}

function Modal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{data.name}</h3>
          <div className="mt-2">
            <ul>
              {data.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <button
              onClick={onClose}
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              Bağla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [stats, setStats] = useState({
    faculty_count: 10,
    department_count: 20,
    room_count: 30,
    equipment_count: 40,
    corps_count: 5,
    user_count: 100
  });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: '', details: [] });

  const data = [
    { name: '1ci Korpus', value: 381 },
    { name: '2ci Korpus', value: 397 },
    { name: '3ci Korpus', value: 93 },
    { name: '4ci Korpus', value: 109 },
    { name: '5ci Korpus', value: 275 },
    { name: '6ci Korpus', value: 329 },
    { name: '7ci Korpus', value: 144 }
  ];

  const data1 = [
    { name: '1ci Korpus', value: 391 },
    { name: '2ci Korpus', value: 390 },
    { name: '3ci Korpus', value: 80 },
    { name: '4ci Korpus', value: 107 },
    { name: '5ci Korpus', value: 247 },
    { name: '6ci Korpus', value: 331 },
    { name: '7ci Korpus', value: 143 }
  ];

  const data2 = [
    { name: 'Auditoriya', value: 66 },
    { name: 'Şöbələr', value: 34 }
  ];
  
  const COLORS = ['#4CAF50', '#FFC107'];


  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate fetching data
      setTimeout(() => {
        setStats({
          common_computer_count: 1728,
          monitor_count: 1689,
          printer_count: 242,
          projector_count: 194,
          audotory_count_computers: 1142,
          department_computer_count: 586,
          faculty_count: 8,
          department_count: 20,
          room_count: 30,
          equipment_count: 3853,
          corps_count: 7,
          user_count: 3
        });
        setLastUpdated(new Date());
        // Reset animation state to trigger new animation
        setShouldAnimate(false);
        setTimeout(() => setShouldAnimate(true), 100);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError(err);
      console.error('Error fetching statistics:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleCardClick = (name, details) => {
    setModalData({ name, details });
    setIsModalOpen(true);
  };

  const statsData = [
    { name: 'Avadanlıqlar', count: stats.equipment_count, icon: Laptop, color: 'bg-red-500', details: ['Kompüterlər: 1728', 'Monitorlar: 1689', 'Printerlər: 242', 'Proyektorlar: 194'] },
    { name: 'Ümumi Kompüter Sayı', count: stats.common_computer_count, icon: Laptop, color: 'bg-blue-500', details:  ['1ci Korpus: 381', '2ci Korpus: 397', '3ci Korpus: 93', '4ci Korpus: 109', '5ci Korpus: 275', '6ci Korpus: 329', '7ci Korpus: 144'] },
    { name: 'Ümumi Monitor Sayı', count: stats.monitor_count, icon: Monitor, color: 'bg-green-500', details: ['1ci Korpus: 391', '2ci Korpus: 390', '3ci Korpus: 80', '4ci Korpus: 107', '5ci Korpus: 247', '6ci Korpus: 331', '7ci Korpus: 143']  },
    { name: 'Ümumi Printer Sayı', count: stats.printer_count, icon: Printer, color: 'bg-purple-500', details: ['1ci Korpus: 69', '2ci Korpus: 55', '3ci Korpus: 15', '4ci Korpus: 38', '5ci Korpus: 31', '6ci Korpus: 20', '7ci Korpus: 14'] },
    { name: 'Ümumi Proyektor Sayı', count: stats.projector_count, icon: Projector, color: 'bg-yellow-500', details: ['1ci Korpus: 39', '2ci Korpus: 21', '3ci Korpus: 29', '4ci Korpus: 32', '5ci Korpus: 36', '6ci Korpus: 25', '7ci Korpus: 12'] },
    { name: 'Auditoriyalar üzrə kompüter sayı', count: stats.audotory_count_computers, icon: Laptop, color: 'bg-blue-500', details: ['1ci Korpus: 241', '2ci Korpus: 284', '3ci Korpus: 53', '4ci Korpus: 48', '5ci Korpus: 143', '6ci Korpus: 271', '7ci Korpus: 102'] },
    { name: 'Şöbələr üzrə kompüter sayı', count: stats.department_computer_count, icon: Laptop, color: 'bg-blue-500', details: ['1ci Korpus: 140', '2ci Korpus: 113', '3ci Korpus: 40', '4ci Korpus: 61', '5ci Korpus: 132', '6ci Korpus: 58', '7ci Korpus: 42'] },
    { name: 'Fakültə', count: stats.faculty_count, icon: GraduationCap, color: 'bg-blue-500', details: [] },
    { name: 'Kafedra', count: stats.department_count, icon: BookOpen, color: 'bg-green-500', details: [] },
    { name: 'Korpuslar', count: stats.corps_count, icon: Building2, color: 'bg-purple-500', details: [] },
    { name: 'Otaqlar', count: stats.room_count, icon: DoorOpen, color: 'bg-yellow-500', details: [] },
    { name: 'İstifadəçilər', count: stats.user_count, icon: Users, color: 'bg-indigo-500', details: [] }
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header>
        <nav className="bg-gray-800 text-center text-white py-4 font-semibold"> 
          <h1 className='text-3xl'>Work-in-Progress</h1>
        </nav>
      </header>
      <div className=" ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900"></h1>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  Son yeniləmə: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={fetchStats}
                disabled={isLoading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Yenilə
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {error ? (
          <ErrorState onRetry={fetchStats} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(6).fill(null).map((_, index) => <LoadingCard key={index} />)
              : statsData.map((item) => (
                  <div 
                    key={item.name} 
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    onClick={() => handleCardClick(item.name, item.details)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className={`inline-flex p-3 rounded-lg ${item.color} transform transition-transform duration-300 hover:rotate-12`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="mt-4 text-xl font-medium text-gray-900">{item.name}</h3>
                          <p className="mt-1 text-3xl font-semibold text-gray-900">
                            {shouldAnimate ? <AnimatedCounter end={item.count} duration={500} /> : 0}
                          </p>
                        </div>
                        <div className={`h-12 w-1 ${item.color} rounded-full`}></div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="flex items-center">
                            Ümumi say
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
          </div>
          
        )}
         <div className="w-full h-96 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Kompüterlər</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4285F4" barSize={50} label={{ position: 'top', fill: 'white' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="w-full h-96 mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">Monitorlar</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data1} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#45EBA5" barSize={50} label={{ position: 'top', fill: 'white' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="w-full h-96 flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">Auditoriya və şöbələr arası kompüterlərin faiz fərqi</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data2}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
  <p>Made by Ruhid © {new Date().getFullYear()}</p>
</footer>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={modalData} />
    </div>
  );
}

export default App;