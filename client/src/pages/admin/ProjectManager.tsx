import React, { useEffect, useState } from 'react';
import { fetchAdminTasks, updateTaskStatusApi, api } from '../../services/api';
import { TaskItem } from '../../types';
import { Plus, CheckSquare, Clock, AlertCircle, Calendar, User } from 'lucide-react';

export const ProjectManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [assigneeName, setAssigneeName] = useState('');

  const loadTasks = () => {
    fetchAdminTasks().then(setTasks).catch(console.error);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleStatusChange = async (taskId: string, newStatus: TaskItem['status']) => {
    try {
      await updateTaskStatusApi(taskId, newStatus);
      loadTasks();
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      await api.post('/admin/tasks', {
        title,
        description,
        priority,
        assigneeName: assigneeName || 'Field Lead',
        workstreamCode: 'WS-01',
        boardName: 'Mangrove Operations'
      });
      setModalOpen(false);
      setTitle('');
      setDescription('');
      loadTasks();
    } catch (err: any) {
      alert(err.message || 'Error creating task');
    }
  };

  const columns: TaskItem['status'][] = ['Planning', 'In Progress', 'Under Review', 'Completed'];

  return (
    <div className="space-y-8">
      
      <div className="flex justify-between items-center border-b border-cyan-500/20 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Workstream Project Kanban</h1>
          <p className="text-xs text-gray-400">Internal Task Management & Field Deployment Board</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-ocean-950 hover:bg-cyan-400 transition-colors"
        >
          <Plus className="w-4 h-4" /> Create New Task
        </button>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col);
          return (
            <div key={col} className="bg-ocean-950 p-4 rounded-3xl border border-gray-800 flex flex-col space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-gray-300 border-b border-gray-800 pb-2">
                <span>{col}</span>
                <span className="px-2 py-0.5 rounded bg-ocean-900 text-cyan-400 font-mono">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {colTasks.map((t) => (
                  <div key={t._id} className="p-4 bg-ocean-900/80 rounded-2xl border border-cyan-500/20 space-y-3">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-cyan-400 font-mono font-bold">{t.taskId}</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        t.priority === 'High' || t.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-cyan-500/20 text-cyan-300'
                      }`}>
                        {t.priority}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white">{t.title}</h4>
                    <p className="text-xs text-gray-400 line-clamp-2">{t.description}</p>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-800 pt-2">
                      <span className="flex items-center gap-1"><User className="w-3 h-3 text-cyan-400" /> {t.assigneeName}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gray-500" /> {t.dueDate}</span>
                    </div>

                    {/* Quick Move Selector */}
                    <select
                      value={t.status}
                      onChange={(e) => handleStatusChange(t.taskId, e.target.value as TaskItem['status'])}
                      className="w-full bg-ocean-950 border border-gray-700 rounded text-[10px] px-2 py-1 text-gray-300"
                    >
                      {columns.map((c) => (
                        <option key={c} value={c}>Move to {c}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Task Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-ocean-950/80 backdrop-blur flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Create Operations Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 font-semibold block mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 font-semibold block mb-1">Assignee Name</label>
                <input
                  type="text"
                  value={assigneeName}
                  onChange={(e) => setAssigneeName(e.target.value)}
                  placeholder="e.g. Field Operations Lead"
                  className="w-full bg-ocean-900 border border-gray-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold bg-cyan-500 text-ocean-950 rounded-xl"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
