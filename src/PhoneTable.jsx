import React from 'react';
import { Phone, Building2, User } from 'lucide-react';

const PhoneTable = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
        <h2 className="text-white text-xl font-semibold">Əlaqə Məlumatları</h2>
      </div>

      {/* Search - Can be implemented later */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            {data.length} nəfər
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-400" />
                  <span>Ad Soyad</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span>Şöbə / Vəzifə</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-400" />
                  <span>Telefon</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item, index) => (
              <tr 
                key={index}
                className="hover:bg-blue-50/50 transition-colors duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-semibold">
                      {item.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{item.position}</div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`tel:${item.phone}`}
                    className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    <Phone size={16} className="text-blue-600" />
                    <span>{item.phone}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhoneTable;