import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const NotFound = () => {
  return (
    <MainLayout>
      <div className='min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8'>
        <div className='text-center space-y-8'>
          <h1 className='text-8xl sm:text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
            text-transparent bg-clip-text animate-pulse'>
            404
          </h1>

          <div className='space-y-4'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-200'>
              Oops! Page Not Found
            </h2>
            <p className='text-slate-600 dark:text-slate-400 max-w-md mx-auto'>
              The page you are looking for might have been removed, had its name changed,
              or is temporarily unavailable.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
            <Link
              to="/"
              className='group bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg 
                transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl 
                flex items-center gap-2'
            >
              <i className="fa-solid fa-house"></i>
              <span>Back to Home</span>
            </Link>

            <Link
              to="/contact"
              className='text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 
                px-6 py-3 rounded-lg transition-colors duration-300 flex items-center gap-2'
            >
              <i className="fa-solid fa-envelope"></i>
              <span>Contact Support</span>
            </Link>
          </div>

          <div className='animate-bounce mt-12'>
            <i className="fa-solid fa-circle-exclamation text-4xl text-indigo-600 dark:text-indigo-400"></i>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFound