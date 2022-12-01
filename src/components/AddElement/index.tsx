import React, { FC, useState } from 'react';
import classNames from 'classnames';

interface AddElementProps {
  element: { type: 'column' } | { type: 'task'; columnId: string };
}

export const AddElement: FC<AddElementProps> = ({ element }) => {
  const { type } = element;

  const [value, setValue] = useState('');

  return (
    <form
      className={classNames('flex items-center shrink-0 mx-2 h-min', {
        'w-80': type === 'column',
        'mt-2 mb-2': type === 'task',
      })}
    >
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {type === 'column' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
              />
            )}
            {type === 'task' && (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            )}
          </svg>
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="border text-sm rounded-lg block w-full pl-10 p-2.5 bg-neutral-700 border-neutral-600 placeholder-white/60 focus:ring-blue-500 focus:border-blue-500"
          placeholder={`Add ${type}`}
          required
        />
      </div>
      <button
        disabled={Boolean(!value.length)}
        type="submit"
        className="disabled:bg-neutral-900 disabled:border-neutral-800 p-2 ml-2 text-sm font-medium rounded-lg border bg-neutral-500 border-neutral-400 hover:bg-neutral-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={classNames('w-6 h-6', { '-rotate-90': type === 'column' })}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
          />
        </svg>
      </button>
    </form>
  );
};
