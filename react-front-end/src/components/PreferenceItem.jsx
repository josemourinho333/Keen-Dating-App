import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import * as ROUTES from './routes';

const PreferenceItem = (props) => {
  const { selected, title, options, onChange } = props;
  return (
    //cannot pass onChange this way
    <Link to={`${ROUTES.USERPREF}`} state={{ title, selected, options, onChange }}>
      <div className="border-double border-4 grid grid-cols-4">
        <p className="pl-5 pt-5 col-span-3">
          {title}
        </p>

        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-fuchsia-800 mt-8 ml-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>

        <p className="pl-5 pb-2 text-gray-500 text-sm col-span-4">
          {selected}
        </p>
      </div>
    </Link>
  )
}

export default PreferenceItem;