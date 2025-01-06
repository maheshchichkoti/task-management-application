import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';
import useFetch from '../hooks/useFetch';

const Home = () => {
  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;
  const [taskCounts, setTaskCounts] = React.useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });
  const [fetchData, { loading }] = useFetch();

  const fetchTaskCounts = async () => {
    try {
      const response = await fetchData({
        url: '/tasks/stats',
        method: 'get',
        headers: { Authorization: authState.token },
      });
      if (response) {
        setTaskCounts(response.stats);
      }
    } catch (error) {
      console.error('Failed to fetch task counts', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchTaskCounts();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);

  return (
    <MainLayout>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
        {!isLoggedIn ? (
          <div className='relative overflow-hidden'>
            {/* Background Pattern */}
            <div className='absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black)] dark:bg-grid-slate-700'></div>

            <div className='relative container mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='max-w-4xl mx-auto text-center space-y-12 py-20 sm:py-32'>
                <div className='space-y-6'>
                  <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight'>
                    <span className='block text-slate-800 dark:text-white'>Manage Tasks with</span>
                    <span className='block mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text'>
                      Effortless Precision
                    </span>
                  </h1>
                  <p className='text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed'>
                    Transform your productivity with our intuitive task management platform.
                    Stay organized, focused, and accomplish more.
                  </p>
                </div>

                <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                  <Link
                    to="/signup"
                    className='group relative inline-flex items-center justify-center px-8 py-3 
                      bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-medium
                      transition-all duration-300 transform hover:scale-105 shadow-[0_1px_25px_rgba(79,70,229,0.4)]
                      hover:shadow-[0_1px_35px_rgba(79,70,229,0.6)] w-full sm:w-auto'
                  >
                    <span className='flex items-center space-x-3'>
                      <span>Start Your Journey</span>
                      <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                    </span>
                  </Link>
                  <Link
                    to="/login"
                    className='group px-8 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700
                      hover:border-indigo-600 dark:hover:border-indigo-500 transition-colors duration-300
                      text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400
                      w-full sm:w-auto text-lg font-medium flex items-center justify-center space-x-2'
                  >
                    <i className="fa-solid fa-user"></i>
                    <span>Sign In</span>
                  </Link>
                </div>

                {/* Feature Highlights */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 text-left'>
                  {[
                    {
                      icon: 'fa-solid fa-bolt',
                      title: 'Lightning Fast',
                      desc: 'Instant updates and real-time collaboration'
                    },
                    {
                      icon: 'fa-solid fa-shield',
                      title: 'Secure',
                      desc: 'Enterprise-grade security for your data'
                    },
                    {
                      icon: 'fa-solid fa-wand-magic-sparkles',
                      title: 'Intuitive',
                      desc: 'Clean interface with powerful features'
                    }
                  ].map((feature, index) => (
                    <div key={index} className='bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm 
                      rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300'>
                      <div className='text-indigo-600 dark:text-indigo-400 text-2xl mb-4'>
                        <i className={feature.icon}></i>
                      </div>
                      <h3 className='text-xl font-semibold text-slate-800 dark:text-white mb-2'>
                        {feature.title}
                      </h3>
                      <p className='text-slate-600 dark:text-slate-300'>
                        {feature.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
            <div className='space-y-8'>
              {/* Dashboard Header */}
              <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg 
                p-6 sm:p-8 border border-slate-100 dark:border-slate-700'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'>
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-3'>
                      <div className='h-12 w-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl'>
                        {authState.user.name.charAt(0).toUpperCase()}
                      </div>
                      <h1 className='text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white'>
                        Welcome back, <span className='text-indigo-600 dark:text-indigo-400'>{authState.user.name}</span>
                      </h1>
                    </div>
                    <p className='text-slate-600 dark:text-slate-300'>
                      Track and manage your tasks efficiently
                    </p>
                  </div>

                  <Link to="/tasks/add">
                    <button
                      className='group inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 
                      text-white rounded-xl transition-all duration-300 transform hover:scale-105 
                      shadow-lg hover:shadow-xl text-lg font-medium'
                    >
                      <i className="fa-solid fa-plus mr-2 group-hover:rotate-90 transition-transform"></i>
                      Create Task
                    </button>
                  </Link>
                </div>

                {/* Quick Stats
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8'>
                  {[
                    { label: 'Total Tasks', value: taskCounts.total, icon: 'fa-list-check' },
                    { label: 'Completed', value: taskCounts.completed, icon: 'fa-check-circle' },
                    { label: 'In Progress', value: taskCounts.inProgress, icon: 'fa-spinner' },
                    { label: 'Pending', value: taskCounts.pending, icon: 'fa-clock' },
                  ].map((stat, index) => (
                    <div key={index} className='bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 
                      text-center hover:shadow-md transition-shadow duration-300'>
                      <i className={`fa-solid ${stat.icon} text-2xl text-indigo-600 dark:text-indigo-400 mb-2`}></i>
                      <div className='text-2xl font-bold text-slate-800 dark:text-white'>{stat.value}</div>
                      <div className='text-sm text-slate-600 dark:text-slate-300'>{stat.label}</div>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Tasks Section */}
              <div className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg 
                border border-slate-100 dark:border-slate-700'>
                <div className='p-6 border-b border-slate-100 dark:border-slate-700'>
                  <h2 className='text-xl font-semibold text-slate-800 dark:text-white'>Your Tasks</h2>
                </div>
                <Tasks />
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Home;