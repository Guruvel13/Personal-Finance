import React from 'react'

export const Modal = ({ children, isOpen, onClose, title }) => {

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-slate-900/40 backdrop-blur-sm overflow-y-auto overflow-x-hidden p-4'>
      <div className='relative w-full max-w-md max-h-full'>
        <div className='relative bg-white rounded-2xl shadow-2xl'>

          <div className='flex items-center justify-between p-4 md:p-5 border-b border-gray-100'>
            <h3 className='text-lg font-bold text-gray-900'>
              {title}
            </h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition-colors'
              onClick={onClose}
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l12 12M13 1L1 13"
                />
              </svg>
            </button>
          </div>

          <div className='p-4 md:p-5'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal 