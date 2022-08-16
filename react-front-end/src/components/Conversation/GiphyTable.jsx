import React, { useState } from 'react';
import TextList from './TextList';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { PlusCircleIcon } from '@heroicons/react/outline';

const giphy = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

const GiphyTable = (props) => {
  const [text, setText] = useState('');
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(false);

  // Toggle emoji table
  const tableClickHandler = () => {
    const status = props.giphyOpen
    props.setGiphyOpen(!status);
  };

  //Handle Giphy input
  const handleInput = (e) => {
    e.preventDefault();
    setText(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      console.log("input is empty right now, please insert text")
      setErr(true)
      return
    }
    console.log("text from GiphyTable", text)

    const apiCall = async () => {
      const res = await giphy.animate(text, { limit: 14 })
      console.log(res.data)
      setResults(res.data)
    }

    apiCall();
    setText('');
    setErr(false);
  }

  return (
   <> 
   <PlusCircleIcon className='emoji-icon mr-1 w-5 h-5 text-black bg-white relative cursor-pointer'
      onClick={tableClickHandler} />
    {props.giphyOpen
    ? <div className='absolute bg-white bottom-24 z-50'>
      <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Search giphy' value={text} onChange={handleInput} onClick={handleSubmit}/>


      {results && <TextList className="drop-shadow-lg" sendGiphy={props.sendGiphy} gifs={results}/>}

    </div>
    : <></>
  }
  </>
  )
}

export default GiphyTable;