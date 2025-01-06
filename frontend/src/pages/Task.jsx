import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {

  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();
  console.log(taskId);

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);


  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      description: task.description
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    if (mode === "add") {
      const config = { url: "/tasks", method: "post", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
    else {
      const config = { url: `/tasks/${taskId}`, method: "put", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
  }


  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <MainLayout>
        <div className='min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 
    bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'>
          <form className='w-full max-w-[800px] bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 
      rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300'>
            {loading ? (
              <div className='flex justify-center items-center min-h-[300px]'>
                <Loader />
              </div>
            ) : (
              <div className='space-y-6'>
                {/* Header */}
                <div className='text-center space-y-2'>
                  <h2 className='text-3xl font-bold text-slate-800 dark:text-white'>
                    {mode === "add" ? (
                      <span className='flex items-center justify-center gap-2'>
                        <i className="fa-solid fa-plus-circle text-indigo-600 dark:text-indigo-400"></i>
                        Create New Task
                      </span>
                    ) : (
                      <span className='flex items-center justify-center gap-2'>
                        <i className="fa-solid fa-pen-to-square text-indigo-600 dark:text-indigo-400"></i>
                        Edit Task
                      </span>
                    )}
                  </h2>
                  <p className='text-slate-600 dark:text-slate-300'>
                    {mode === "add"
                      ? "Add a new task to your list"
                      : "Update your existing task"}
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className='block text-sm font-medium text-slate-700 dark:text-slate-300'
                    >
                      Task Description
                    </label>
                    <div className='relative'>
                      <Textarea
                        type="description"
                        name="description"
                        id="description"
                        value={formData.description}
                        placeholder="What needs to be done?"
                        onChange={handleChange}
                        className='w-full px-4 py-3 rounded-xl border-2 border-slate-200 
                    dark:border-slate-600 bg-white dark:bg-slate-700
                    focus:border-indigo-500 dark:focus:border-indigo-400 
                    focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20
                    placeholder-slate-400 dark:placeholder-slate-500
                    text-slate-800 dark:text-slate-200 transition-all duration-300
                    min-h-[120px] resize-y'
                      />
                      <div className='absolute right-3 top-3 text-slate-400 dark:text-slate-500'>
                        <i className="fa-solid fa-pencil"></i>
                      </div>
                    </div>
                    {fieldError("description") && (
                      <p className='text-red-500 dark:text-red-400 text-sm mt-1 flex items-center gap-1'>
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {fieldError("description")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    className='flex-1 inline-flex justify-center items-center px-6 py-3 
                bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl 
                transition-all duration-300 transform hover:scale-105 
                shadow-lg hover:shadow-xl text-base font-medium gap-2'
                  >
                    <i className={`fa-solid ${mode === "add" ? "fa-plus" : "fa-save"}`}></i>
                    <span>{mode === "add" ? "Create Task" : "Update Task"}</span>
                  </button>

                  <button
                    type='button'
                    onClick={() => navigate("/")}
                    className='flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 
                border-2 border-slate-200 dark:border-slate-700 text-slate-600 
                dark:text-slate-300 hover:border-red-500 hover:text-red-500 
                dark:hover:border-red-500 dark:hover:text-red-400 rounded-xl 
                transition-colors duration-300 text-base font-medium gap-2'
                  >
                    <i className="fa-solid fa-xmark"></i>
                    <span>Cancel</span>
                  </button>

                  {mode === "update" && (
                    <button
                      type='button'
                      onClick={handleReset}
                      className='flex-1 sm:flex-none inline-flex justify-center items-center px-6 py-3 
                  bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 
                  dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 
                  rounded-xl transition-colors duration-300 text-base 
                  font-medium gap-2'
                    >
                      <i className="fa-solid fa-rotate"></i>
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </MainLayout>
    </>
  )
}

export default Task