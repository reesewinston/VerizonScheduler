import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Search, Filter, Clock, MapPin, Users, AlertCircle } from 'lucide-react';

const VerizonScheduler = () => {
  const [activeShift, setActiveShift] = useState('night');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState({});
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize with sample data
  useEffect(() => {
    const initialTasks = {
      [selectedDate]: {
        night: [
          {
            id: '17304394',
            time: '11:30 PM',
            site: 'Statesboro NE',
            workType: 'Router/BBU/Westell Migration',
            contractor: 'Nextedge',
            engineer: 'Kevin Pellum',
            status: {
              lkf: 'pending',
              cbrs: 'complete',
              switchEngr: 'pending',
              prePost: 'complete',
              bw: 'pending',
              sif: 'pending',
              fae: 'pending',
              tc: 'pending',
              comments: 'ISP ready',
              notification: 'sent'
            }
          },
          {
            id: '17304710',
            time: '11:30 PM',
            site: 'TIFTON SOUTHWEST',
            workType: 'Router/BBU/Westell Migration',
            contractor: 'Nextedge',
            engineer: 'Kevin Pellum',
            status: {
              lkf: 'complete',
              cbrs: 'complete',
              switchEngr: 'complete',
              prePost: 'complete',
              bw: 'complete',
              sif: 'pending',
              fae: 'pending',
              tc: 'pending',
              comments: 'On schedule',
              notification: 'sent'
            }
          },
          {
            id: '17304387',
            time: '3:30 AM',
            site: 'CLAXTON DT',
            workType: 'Router/BBU/Westell Migration',
            contractor: 'Nextedge',
            engineer: 'Kevin Pellum',
            status: {
              lkf: 'pending',
              cbrs: 'pending',
              switchEngr: 'pending',
              prePost: 'pending',
              bw: 'pending',
              sif: 'pending',
              fae: 'pending',
              tc: 'pending',
              comments: 'Awaiting coordination',
              notification: 'pending'
            }
          }
        ],
        day: [
          {
            id: '16999464',
            time: 'All Day',
            site: 'Matthews',
            workType: 'C Band Grow',
            contractor: 'Wes-tec',
            engineer: 'TBD',
            details: 'Leave locked until BW delivers. (F) 6/30 - (3) 6419',
            status: {
              lkf: 'pending',
              cbrs: 'pending',
              switchEngr: 'pending',
              prePost: 'pending',
              bw: 'blocked',
              sif: 'pending',
              fae: 'pending',
              tc: 'pending',
              comments: 'Waiting for BW delivery',
              notification: 'sent'
            }
          },
          {
            id: '17132352',
            time: '1/2 Day',
            site: 'Chapel Rd',
            workType: 'Grow (3) 6419s',
            contractor: 'Centerline',
            engineer: 'TBD',
            status: {
              lkf: 'complete',
              cbrs: 'complete',
              switchEngr: 'complete',
              prePost: 'complete',
              bw: 'complete',
              sif: 'complete',
              fae: 'pending',
              tc: 'pending',
              comments: 'Ready to proceed',
              notification: 'sent'
            }
          }
        ],
        hourly: [
          {
            id: '16302137',
            time: '7:00 AM',
            site: 'Summit',
            workType: 'Troubleshoot Beta 700 port',
            contractor: 'Tayven',
            engineer: 'TBD',
            status: {
              lkf: 'pending',
              cbrs: 'pending',
              switchEngr: 'pending',
              prePost: 'pending',
              bw: 'pending',
              sif: 'pending',
              fae: 'pending',
              tc: 'pending',
              comments: 'Priority troubleshoot',
              notification: 'sent'
            }
          },
          {
            id: '16060220',
            time: '8:00 AM',
            site: 'Falkville',
            workType: 'Troubleshoot Alpha RETs',
            contractor: 'Wes-tec',
            engineer: 'TBD',
            status: {
              lkf: 'complete',
              cbrs: 'complete',
              switchEngr: 'pending',
              prePost: 'pending',
              bw: 'pending',
              sif: 'pending',
              fae: 'pending',
              tc: 'pending',
              comments: 'Equipment staged',
              notification: 'sent'
            }
          },
          {
            id: '16999560',
            time: '9:00 AM',
            site: 'MAPLESVILLE',
            workType: 'Router/BBU/Westell Migration',
            contractor: 'Nextedge',
            engineer: 'Kevin Pellum',
            status: {
              lkf: 'pending',
              cbrs: 'pending',
              switchEngr: 'pending',
              prePost: 'pending',
              bw: 'pending',
              sif: 'pending',
              fae: 'pending',
              tc: 'pending',
              comments: 'Scheduled maintenance window',
              notification: 'pending'
            }
          }
        ]
      }
    };
    setTasks(initialTasks);
  }, [selectedDate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getShiftTasks = () => {
    const dayTasks = tasks[selectedDate] || {};
    return dayTasks[activeShift] || [];
  };

  const filteredTasks = getShiftTasks().filter(task =>
    task.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.id.includes(searchTerm) ||
    task.engineer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TaskCard = ({ task }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono">
              {task.id}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
              {task.time}
            </span>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{task.site}</h3>
          <p className="text-gray-600 mb-2">{task.workType}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={14} />
              {task.contractor}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {task.engineer}
            </span>
          </div>
          {task.details && (
            <p className="text-sm text-gray-600 mt-2 italic">{task.details}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setEditingTask(task)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit3 size={16} />
          </button>
          <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.lkf)}`}>
          LKF: {task.status.lkf}
        </div>
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.cbrs)}`}>
          CBRS: {task.status.cbrs}
        </div>
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.switchEngr)}`}>
          Switch: {task.status.switchEngr}
        </div>
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.prePost)}`}>
          Pre/Post: {task.status.prePost}
        </div>
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.bw)}`}>
          BW: {task.status.bw}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3">
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.sif)}`}>
          SIF: {task.status.sif}
        </div>
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.fae)}`}>
          FAE: {task.status.fae}
        </div>
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.tc)}`}>
          TC: {task.status.tc}
        </div>
        <div className={`px-2 py-1 rounded text-xs border ${getStatusColor(task.status.notification)}`}>
          Notify: {task.status.notification}
        </div>
      </div>

      {task.status.comments && (
        <div className="bg-gray-50 rounded p-2 text-sm">
          <span className="font-medium text-gray-700">Comments: </span>
          <span className="text-gray-600">{task.status.comments}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Verizon Scheduling Platform</h1>
              <p className="text-red-100">Network Infrastructure Work Coordination</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 rounded bg-white text-gray-900 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveShift('night')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeShift === 'night'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Clock size={16} className="inline mr-2" />
                Night Shift (11:30 PM - 7:30 AM)
              </button>
              <button
                onClick={() => setActiveShift('day')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeShift === 'day'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Clock size={16} className="inline mr-2" />
                Day Shift (7:00 AM - 6:00 PM)
              </button>
              <button
                onClick={() => setActiveShift('hourly')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeShift === 'hourly'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Clock size={16} className="inline mr-2" />
                Hourly Slots (7:00 AM - 5:00 PM)
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sites, IDs, engineers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Shift Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={20} className="text-blue-600" />
            <h2 className="text-lg font-semibold">
              {activeShift === 'night' && 'Night Shift - Router/BBU Work Only (Integration/BBU Bridge)'}
              {activeShift === 'day' && 'Full Day/Half Day 4G-5G Mods (Primary), Tower Crew Bridge'}
              {activeShift === 'hourly' && 'Reserved for T/S\'ing, Emergency Recovery and Revisits Only'}
            </h2>
          </div>
          <div className="text-sm text-gray-600">
            {activeShift === 'night' && (
              <p>Westell/ENSE migrations only. Time slots: 11:30 PM, 12:30 AM, 1:30 AM, 2:30 AM, 3:30 AM, 4:30 AM, 5:30 AM, 6:30 AM, 7:30 AM</p>
            )}
            {activeShift === 'day' && (
              <p>All day or 1/2 Day 4G/5G MOD, New Macro integration work</p>
            )}
            {activeShift === 'hourly' && (
              <p>1 hr slots for: Transport cutovers, media converter cutovers, 4GSC builds, 5G UWB node checks, SAU/Westell alarming conversions</p>
            )}
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Clock size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks scheduled
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'No tasks match your search criteria.' : `No tasks scheduled for ${activeShift} shift on ${selectedDate}.`}
              </p>
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Schedule First Task
              </button>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>

      {/* Status Legend */}
      <div className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Status Legend:</h3>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
              <span>Complete</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
              <span>Blocked/Issue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerizonScheduler;