import React from 'react'

const Loading = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4 text-center text-indigo-600">
      <svg
        className="w-10 h-10 mb-4 animate-spin text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <div className="text-xl font-semibold animate-pulseSlow">
        Loading...
      </div>
    </div>
  );
}

export default Loading