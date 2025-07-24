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
  Projector,
  Cpu,
  Cable,
  X,
  Phone
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid,  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,  LineChart, Line,} from 'recharts';
import PhoneTable from './PhoneTable';
import { phoneData } from './PhoneData';

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-900">{data.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {data.name === 'IP telefon Sayı' ? (
            <PhoneTable data={phoneData} />
          ) : (
            <div className="space-y-4">
              {data.details.map((detail, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    typeof detail === 'string'
                      ? 'bg-gray-50 hover:bg-gray-100'
                      : ''
                  } transition-colors`}
                >
                  {detail}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 active:bg-gray-950 transform transition-all duration-200 hover:scale-105"
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
    { name: '1ci Korpus', value: 452 },
    { name: '2ci Korpus', value: 397 },
    { name: '3ci Korpus', value: 88 },
    { name: '4ci Korpus', value: 104 },
    { name: '5ci Korpus', value: 316 },
    { name: '6ci Korpus', value: 329 },
    { name: '7ci Korpus', value: 183 }
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
    { name: 'Auditoriya', value: 61 },
    { name: 'Şöbələr', value: 39 }
  ];

  const data3 = [
    { name: 'i5-13400', value: 347 },
    { name: 'i3-1315u', value: 27 },
    { name: 'i7-12700', value: 100 },
    { name: 'i7-11700', value: 222 },
    { name: 'i7-10700', value: 105 },
    { name: 'i5-10400', value: 129 },
    { name: 'i3-6100', value: 35 },
    { name: 'i3-8100', value: 53 },
    { name: 'i3-3240', value: 24 },
    { name: 'i3-2120', value: 55 },
    { name: 'Pentium G630', value: 32 },
    { name: 'VIA Eden', value: 133 },
    { name: 'Digərləri', value: 466 },
  ];

  const COLORS = ['#4CAF50', '#FFC107'];

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate fetching data
      setTimeout(() => {
        setStats({
          common_computer_count: 1869,
          monitor_count: 1827,
          printer_count: 247,
          projector_count: 186,
          tel_count: 148,
          audotory_count_computers: 1142,
          department_computer_count: 586,
          faculty_count: 8,
          department_count: 20,
          room_count: 30,
          equipment_count: 4606,
          corps_count: 7,
          user_count: 3,
          cpu_count: 2055,
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
    if (name === 'Texniki göstəricilər') {
      details = [
        ...details,
        <div className="mt-4 font-semibold">Anbarda 327</div>,
        '150 i7 13 nəsil',
        '173 mini pc',
        '4 i5 13 nəsil'
      ];
    }
    setModalData({ name, details });
    setIsModalOpen(true);
  };

  const statsData = [
    { name: 'Avadanlıqlar', count: stats.equipment_count, icon: Cable, color: 'bg-red-500', details: ['Kompüterlər: 1869', 'Monitorlar: 1827', 'Printerlər: 247', 'Proyektorlar: 186', 'Anbarda olan kompüter: 327', 'Ümumi IP telefon(148 Aktiv; 2 Anbar): 150'] },
    { name: 'Ümumi Kompüter Sayı', count: stats.common_computer_count, icon: Laptop, color: 'bg-blue-500', details:  ['1ci Korpus: 381', '2ci Korpus: 397', '3ci Korpus: 93', '4ci Korpus: 109', '5ci Korpus: 275', '6ci Korpus: 329', '7ci Korpus: 144'] },
    { name: 'Texniki göstəricilər', count: stats.cpu_count, icon:  Cpu, color: 'bg-[#FF6600]',details: [
      'Digərləri: 449',
      'VIA Eden 1.0GHz 512MB RAM: 133',
      'Pentium G630: 32',
      'i3-2120: 55',
      'i3-3240: 24',
      'i3-8100: 53',
      'i3-6100: 35',
      'i5-10400: 129',
      'i7-10700: 105',
      'i7-11700: 222',
      'i7-12700: 100',
      'i3-1315u: 27',
      'i5-13400: 347'
    ]    
 },
    { name: 'Ümumi Printer Sayı', count: stats.printer_count, icon: Printer, color: 'bg-purple-500', details: ['1ci Korpus: 69', '2ci Korpus: 55', '3ci Korpus: 15', '4ci Korpus: 38', '5ci Korpus: 31', '6ci Korpus: 20', '7ci Korpus: 14'] },
    { name: 'IP telefon Sayı', count: stats.tel_count, icon: Phone, color: 'bg-[#8FD14F]', details: [] },
    { name: 'Ümumi Proyektor Sayı', count: stats.projector_count, icon: Projector, color: 'bg-yellow-500', details: ['1ci Korpus: 39', '2ci Korpus: 21', '3ci Korpus: 29', '4ci Korpus: 32', '5ci Korpus: 36', '6ci Korpus: 25', '7ci Korpus: 12'] },
    { name: 'Auditoriyalar üzrə kompüter sayı', count: stats.audotory_count_computers, icon: Laptop, color: 'bg-blue-500', details: ['1ci Korpus: 241', '2ci Korpus: 284', '3ci Korpus: 53', '4ci Korpus: 48', '5ci Korpus: 143', '6ci Korpus: 271', '7ci Korpus: 102'] },
    { name: 'Şöbələr üzrə kompüter sayı', count: stats.department_computer_count, icon: Laptop, color: 'bg-[#6C48C5]', details: ['1ci Korpus: 140', '2ci Korpus: 113', '3ci Korpus: 40', '4ci Korpus: 61', '5ci Korpus: 132', '6ci Korpus: 58', '7ci Korpus: 42'] },
    { name: 'Fakültə', count: stats.faculty_count, icon: GraduationCap, color: 'bg-blue-500', details: [] },
    { name: 'Ümumi Monitor Sayı', count: stats.monitor_count, icon: Monitor, color: 'bg-green-500', details: ['1ci Korpus: 391', '2ci Korpus: 390', '3ci Korpus: 80', '4ci Korpus: 107', '5ci Korpus: 247', '6ci Korpus: 331', '7ci Korpus: 143']  },

    { name: 'Kafedra', count: stats.department_count, icon: BookOpen, color: 'bg-green-500', details: [] },
    { name: 'Korpuslar', count: stats.corps_count, icon: Building2, color: 'bg-purple-500', details: [] },
    { name: 'Otaqlar', count: stats.room_count, icon: DoorOpen, color: 'bg-yellow-500', details: [] },
    { name: 'İstifadəçilər', count: stats.user_count, icon: Users, color: 'bg-indigo-500', details: [] }
  ];

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header>
        <nav className="bg-gray-800 text-center text-white py-2 font-semibold"> 
          <h1 className='text-xl'>Work-in-Progress</h1>
        </nav>
      </header>
      <div className=" ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between  items-center gap-5">
            <h1 className="md:text-3xl text-2xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-2 md:space-x-4">
              {lastUpdated && (
                <span className="text-sm text-gray-500">
                  Son yeniləmə: <br /> {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={fetchStats}
                disabled={isLoading}
                className={`inline-flex items-center px-2 py-1 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed ${isLoading ? 'animate-pulse' : ''}`}
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
                    className="bg-white rounded-lg cursor-pointer shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
          <YAxis domain={[0, 600]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#4285F4" barSize={50} label={{ position: 'top', fill: 'black' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>

 
    <div className="w-full h-96 mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">Nəsillər və saylar</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data3} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 600]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#FF6600" barSize={50} label={{ position: 'top', fill: 'black' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>


    <div className="w-full h-96 mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">Monitorlar</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data1} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 600]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#45EBA5" barSize={50} label={{ position: 'top', fill: 'black' }} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="w-full h-[500px] flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">Auditoriya və şöbələr arası kompüterlərin faiz fərqi</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data2}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            outerRadius={200}
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



//pls bir yere gedende komputeri lock et :) 16



// import React, { useState, useEffect } from 'react';
// import { 
//   Building2, 
//   GraduationCap, 
//   Users, 
//   DoorOpen, 
//   BookOpen,
//   Laptop,
//   RefreshCw,
//   AlertCircle,
//   Monitor,
//   Printer,
//   Projector,
//   Cpu,
//   Cable,
//   X
// } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, Legend, CartesianGrid, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// function AnimatedCounter({ end, duration = 1000 }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let startTimestamp = null;
//     const step = (timestamp) => {
//       if (!startTimestamp) startTimestamp = timestamp;
//       const progress = Math.min((timestamp - startTimestamp) / duration, 1);
//       setCount(Math.floor(progress * end));
      
//       if (progress < 1) {
//         window.requestAnimationFrame(step);
//       } else {
//         setCount(end);
//       }
//     };
    
//     window.requestAnimationFrame(step);
//   }, [end, duration]);

//   return <span className="font-bold text-3xl md:text-4xl">{count.toLocaleString()}</span>;
// }

// function LoadingCard() {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse">
//       <div className="flex flex-col space-y-4">
//         <div className="flex justify-between">
//           <div className="space-y-2">
//             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
//             <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
//             <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
//           </div>
//           <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
//         </div>
//         <div className="pt-4 border-t">
//           <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ErrorState({ onRetry }) {
//   return (
//     <div className="flex items-center justify-center min-h-[400px]">
//       <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl text-center max-w-md">
//         <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
//         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Məlumatları yükləmək mümkün olmadı</h3>
//         <p className="text-gray-600 dark:text-gray-300 mb-6">Zəhmət olmasa bir az sonra yenidən cəhd edin</p>
//         <button 
//           onClick={onRetry}
//           className="flex items-center justify-center mx-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//         >
//           <RefreshCw className="mr-2 h-5 w-5" />
//           Yenidən cəhd et
//         </button>
//       </div>
//     </div>
//   );
// }

// function Modal({ isOpen, onClose, data }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto">
//         <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
//           <h3 className="text-xl font-bold text-gray-900 dark:text-white">{data.name}</h3>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="space-y-3">
//             {data.details.map((detail, index) => (
//               <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200">
//                 {detail}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//           <div className="flex justify-end">
//             <button 
//               onClick={onClose}
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//             >
//               Bağla
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [stats, setStats] = useState({
//     faculty_count: 10,
//     department_count: 20,
//     room_count: 30,
//     equipment_count: 40,
//     corps_count: 5,
//     user_count: 100
//   });
//   const [shouldAnimate, setShouldAnimate] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({ name: '', details: [] });

//   const data = [
//     { name: '1ci Korpus', value: 381 },
//     { name: '2ci Korpus', value: 397 },
//     { name: '3ci Korpus', value: 93 },
//     { name: '4ci Korpus', value: 109 },
//     { name: '5ci Korpus', value: 275 },
//     { name: '6ci Korpus', value: 329 },
//     { name: '7ci Korpus', value: 144 }
//   ];

//   const data1 = [
//     { name: '1ci Korpus', value: 391 },
//     { name: '2ci Korpus', value: 390 },
//     { name: '3ci Korpus', value: 80 },
//     { name: '4ci Korpus', value: 107 },
//     { name: '5ci Korpus', value: 247 },
//     { name: '6ci Korpus', value: 331 },
//     { name: '7ci Korpus', value: 143 }
//   ];

//   const data2 = [
//     { name: 'Auditoriya', value: 66 },
//     { name: 'Şöbələr', value: 34 }
//   ];

//   const data3 = [
//     { name: 'i5-13400', value: 347 },
//     { name: 'i3-1315u', value: 27 },
//     { name: 'i7-12700', value: 100 },
//     { name: 'i7-11700', value: 222 },
//     { name: 'i7-10700', value: 105 },
//     { name: 'i5-10400', value: 129 },
//     { name: 'i3-6100', value: 35 },
//     { name: 'i3-8100', value: 53 },
//     { name: 'i3-3240', value: 24 },
//     { name: 'i3-2120', value: 55 },
//     { name: 'Pentium G630', value: 32 },
//     { name: 'VIA Eden', value: 133 },
//     { name: 'Digərləri', value: 466 },
//   ];

//   const COLORS = ['#4CAF50', '#FFC107'];

//   const fetchStats = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       setTimeout(() => {
//         setStats({
//           common_computer_count: 1728,
//           monitor_count: 1689,
//           printer_count: 242,
//           projector_count: 194,
//           audotory_count_computers: 1142,
//           department_computer_count: 586,
//           faculty_count: 8,
//           department_count: 20,
//           room_count: 30,
//           equipment_count: 4180,
//           corps_count: 7,
//           user_count: 3,
//           cpu_count: 2055,
//         });
//         setLastUpdated(new Date());
//         setShouldAnimate(false);
//         setTimeout(() => setShouldAnimate(true), 100);
//         setIsLoading(false);
//       }, 1000);
//     } catch (err) {
//       setError(err);
//       console.error('Error fetching statistics:', err);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const handleCardClick = (name, details) => {
//     if (name === 'Texniki göstəricilər') {
//       details = [
//         ...details,
//         <div>Anbarda 327</div>,
//         '150 i7 13 nəsil',
//         '173 mini pc',
//         '4 i5 13 nəsil'
//       ];
//     }
//     setModalData({ name, details });
//     setIsModalOpen(true);
//   };

//   const statsData = [
//     { name: 'Avadanlıqlar', count: stats.equipment_count, icon: Cable, color: 'bg-gradient-to-br from-red-400 to-pink-600', textColor: 'text-white', details: ['Kompüterlər: 1728', 'Monitorlar: 1689', 'Printerlər: 242', 'Proyektorlar: 194', 'Anbarda olan kompüter: 327'] },
//     { name: 'Ümumi Kompüter Sayı', count: stats.common_computer_count, icon: Laptop, color: 'bg-gradient-to-br from-blue-400 to-indigo-600', textColor: 'text-white', details:  ['1ci Korpus: 381', '2ci Korpus: 397', '3ci Korpus: 93', '4ci Korpus: 109', '5ci Korpus: 275', '6ci Korpus: 329', '7ci Korpus: 144'] },
//     { name: 'Texniki göstəricilər', count: stats.cpu_count, icon: Cpu, color: 'bg-gradient-to-br from-orange-400 to-amber-600', textColor: 'text-white', details: [
//       'Digərləri: 449',
//       'VIA Eden 1.0GHz 512MB RAM: 133',
//       'Pentium G630: 32',
//       'i3-2120: 55',
//       'i3-3240: 24',
//       'i3-8100: 53',
//       'i3-6100: 35',
//       'i5-10400: 129',
//       'i7-10700: 105',
//       'i7-11700: 222',
//       'i7-12700: 100',
//       'i3-1315u: 27',
//       'i5-13400: 347'
//     ]},
//     { name: 'Ümumi Monitor Sayı', count: stats.monitor_count, icon: Monitor, color: 'bg-gradient-to-br from-green-400 to-emerald-600', textColor: 'text-white', details: ['1ci Korpus: 391', '2ci Korpus: 390', '3ci Korpus: 80', '4ci Korpus: 107', '5ci Korpus: 247', '6ci Korpus: 331', '7ci Korpus: 143']  },
//     { name: 'Ümumi Printer Sayı', count: stats.printer_count, icon: Printer, color: 'bg-gradient-to-br from-purple-400 to-violet-600', textColor: 'text-white', details: ['1ci Korpus: 69', '2ci Korpus: 55', '3ci Korpus: 15', '4ci Korpus: 38', '5ci Korpus: 31', '6ci Korpus: 20', '7ci Korpus: 14'] },
//     { name: 'Ümumi Proyektor Sayı', count: stats.projector_count, icon: Projector, color: 'bg-gradient-to-br from-yellow-400 to-amber-500', textColor: 'text-white', details: ['1ci Korpus: 39', '2ci Korpus: 21', '3ci Korpus: 29', '4ci Korpus: 32', '5ci Korpus: 36', '6ci Korpus: 25', '7ci Korpus: 12'] },
//     { name: 'Auditoriyalar üzrə kompüter sayı', count: stats.audotory_count_computers, icon: Laptop, color: 'bg-gradient-to-br from-sky-400 to-cyan-600', textColor: 'text-white', details: ['1ci Korpus: 241', '2ci Korpus: 284', '3ci Korpus: 53', '4ci Korpus: 48', '5ci Korpus: 143', '6ci Korpus: 271', '7ci Korpus: 102'] },
//     { name: 'Şöbələr üzrə kompüter sayı', count: stats.department_computer_count, icon: Laptop, color: 'bg-gradient-to-br from-blue-500 to-violet-500', textColor: 'text-white', details: ['1ci Korpus: 140', '2ci Korpus: 113', '3ci Korpus: 40', '4ci Korpus: 61', '5ci Korpus: 132', '6ci Korpus: 58', '7ci Korpus: 42'] },
//     { name: 'Fakültə', count: stats.faculty_count, icon: GraduationCap, color: 'bg-gradient-to-br from-blue-400 to-blue-600', textColor: 'text-white', details: [] },
//     { name: 'Kafedra', count: stats.department_count, icon: BookOpen, color: 'bg-gradient-to-br from-green-400 to-green-600', textColor: 'text-white', details: [] },
//     { name: 'Korpuslar', count: stats.corps_count, icon: Building2, color: 'bg-gradient-to-br from-purple-400 to-purple-600', textColor: 'text-white', details: [] },
//     { name: 'Otaqlar', count: stats.room_count, icon: DoorOpen, color: 'bg-gradient-to-br from-yellow-400 to-yellow-600', textColor: 'text-white', details: [] },
//     { name: 'İstifadəçilər', count: stats.user_count, icon: Users, color: 'bg-gradient-to-br from-indigo-400 to-indigo-600', textColor: 'text-white', details: [] }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
//       <header className="bg-white dark:bg-gray-800 shadow-md">
//         <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Work-in-Progress</h1>
//         </nav>
//       </header>
//       <div className="container mx-auto px-4 py-6">
//         <div className="mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
//             <div className="flex items-center space-x-4">
//               {lastUpdated && (
//                 <span className="text-sm text-gray-600 dark:text-gray-400">
//                   Son yeniləmə: <br /> {lastUpdated.toLocaleTimeString()}
//                 </span>
//               )}
//               <button 
//                 onClick={fetchStats} 
//                 disabled={isLoading}
//                 className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
//               >
//                 <RefreshCw className={`mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
//                 Yenilə
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <main className="container mx-auto px-4 pb-12">
//         {error ? (
//           <ErrorState onRetry={fetchStats} />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {isLoading
//               ? Array(6).fill(null).map((_, index) => <LoadingCard key={index} />)
//               : statsData.map((item) => (
//                   <div 
//                     key={item.name} 
//                     onClick={() => handleCardClick(item.name, item.details)}
//                     className={`${item.color} rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-300`}
//                   >
//                     <div className="p-6">
//                       <div className="flex flex-col h-full">
//                         <div className="flex justify-between items-start mb-4">
//                           <div className={`${item.textColor}`}>
//                             <div className="bg-white bg-opacity-20 p-3 rounded-lg inline-block mb-3">
//                               <item.icon className="h-6 w-6" />
//                             </div>
//                             <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
//                             <p className="flex items-center">
//                               {shouldAnimate ? <AnimatedCounter end={item.count} duration={1200} /> : 0}
//                             </p>
//                           </div>
//                           <div className="h-12 w-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
//                             {/* Decorative element */}
//                           </div>
//                         </div>
//                         <div className="pt-4 mt-auto border-t border-white border-opacity-20">
//                           <div className="flex items-center">
//                             <span className={`text-sm ${item.textColor} opacity-80`}>
//                               Ümumi say
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//           </div>
//         )}
//         <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Kompüterlər</h2>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis domain={[0, 600]} />
//               <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }} />
//               <Legend />
//               <Bar dataKey="value" fill="#4285F4" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Nəsillər və saylar</h2>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={data3}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis domain={[0, 600]} />
//               <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }} />
//               <Legend />
//               <Bar dataKey="value" fill="#FF6600" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Monitorlar</h2>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={data1}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis domain={[0, 600]} />
//               <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }} />
//               <Legend />
//               <Bar dataKey="value" fill="#45EBA5" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-6">Auditoriya və şöbələr arası kompüterlərin faiz fərqi</h2>
//           <ResponsiveContainer width="100%" height={400}>
//             <PieChart>
//               <Pie
//                 data={data2}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//                 outerRadius={150}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {data2.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px' }} />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </main>
//       <footer className="bg-white dark:bg-gray-800 py-6 text-center text-gray-600 dark:text-gray-400 shadow-inner">
//         <p>Made by Ruhid © {new Date().getFullYear()}</p>
//       </footer>
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={modalData} />
//     </div>
//   );
// }

// export default App;