import {EmojiHappyIcon} from '@heroicons/react/outline';
import { useState, useEffect } from 'react';
// Hook credit to @ealush
import Picker from 'emoji-picker-react';

const EmojiTable = (props) => {

  // Toggle emoji table
  const tableClickHandler = () => {
    const status = props.emojiOpen
    props.setEmojiOpen(!status);
  };

  // Handle emoji click
  const onEmojiClick = (event, emojiObject) => {
    props.setMessage(prev => prev + emojiObject.emoji);
  };

  return (
    <>
    <EmojiHappyIcon className='emoji-icon mr-1 w-5 h-5 text-black bg-white relative cursor-pointer' onClick={tableClickHandler}/>
    {props.emojiOpen
      ? <div className='absolute bg-white bottom-24 z-50'>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      : <></>
    }
    </>
  )
};

export default EmojiTable;