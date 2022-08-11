import React from "react";

const PreferenceInput = (props) => {

  return (
    <div className="grid grid-cols-2">
        <div className="col-span-2">
        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
      </div>
  )
}

export default PreferenceInput;