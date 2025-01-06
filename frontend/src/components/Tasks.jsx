import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }


  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {tasks.length !== 0 && (
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2'>
            <i className="fa-solid fa-list-check text-indigo-600 dark:text-indigo-400"></i>
            Your Tasks
            <span className='ml-2 text-sm font-normal px-2 py-1 bg-indigo-100 dark:bg-indigo-900/50 
            text-indigo-600 dark:text-indigo-400 rounded-full'>
              {tasks.length}
            </span>
          </h2>
          <Link
            to="/tasks/add"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 
            text-white px-4 py-2 rounded-lg transition-all duration-300 
            transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <i className="fa-solid fa-plus"></i>
            <span>New Task</span>
          </Link>
        </div>
      )}

      {loading ? (
        <div className='flex justify-center items-center min-h-[400px]'>
          <Loader />
        </div>
      ) : (
        <div className='space-y-4'>
          {tasks.length === 0 ? (
            <div className='min-h-[400px] flex flex-col items-center justify-center 
            bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl 
            border border-slate-100 dark:border-slate-700 p-8'>
              <img
                src="/empty-tasks.svg"
                alt="No tasks"
                className='w-48 h-48 mb-6 opacity-75'
              />
              <h3 className='text-xl font-medium text-slate-600 dark:text-slate-300 mb-4'>
                No tasks found
              </h3>
              <Link
                to="/tasks/add"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 
                text-white px-6 py-3 rounded-xl transition-all duration-300 
                transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Create Your First Task</span>
              </Link>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div
                key={task._id}
                className='group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl 
                transition-all duration-300 border border-slate-100 dark:border-slate-700'
              >
                <div className='p-6'>
                  <div className='flex items-center mb-4'>
                    <span className='flex items-center gap-2'>
                      <span className='w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 
                      text-indigo-600 dark:text-indigo-400 flex items-center justify-center 
                      font-medium text-sm'>
                        #{index + 1}
                      </span>
                      <span className='text-sm text-slate-500 dark:text-slate-400'>
                        Task ID: {task._id.slice(-6)}
                      </span>
                    </span>

                    <div className='ml-auto flex items-center gap-2'>
                      <Tooltip text="Edit this task" position="top">
                        <Link
                          to={`/tasks/${task._id}`}
                          className='p-2 text-slate-400 hover:text-indigo-600 dark:text-slate-500 
                          dark:hover:text-indigo-400 transition-colors duration-300'
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </Tooltip>

                      <Tooltip text="Delete this task" position="top">
                        <button
                          onClick={() => handleDelete(task._id)}
                          className='p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 
                          dark:hover:text-red-400 transition-colors duration-300'
                        >
                          <i className="fa-solid fa-trash-alt"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  <div className='prose prose-slate dark:prose-invert max-w-none'>
                    <p className='whitespace-pre-wrap text-slate-600 dark:text-slate-300'>
                      {task.description}
                    </p>
                  </div>

                  <div className='mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 
                  flex items-center justify-between text-sm text-slate-500 dark:text-slate-400'>
                    <span className='flex items-center gap-2'>
                      <i className="fa-regular fa-clock"></i>
                      <span>Created {new Date(task.createdAt).toLocaleDateString()}</span>
                    </span>
                    <span className='flex items-center gap-2'>
                      <i className="fa-solid fa-tag"></i>
                      <span>Task</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Tasks