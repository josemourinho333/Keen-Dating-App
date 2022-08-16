import EmojiTable from "./EmojiTable";
import GiphyTable from "./GiphyTable";
import {useState} from 'react';

import {PaperAirplaneIcon} from '@heroicons/react/outline';

const InputArea = (props) => {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [giphyOpen, setGiphyOpen] = useState(false);

  return (
    <div className='bg-white border flex border-gray-300 rounded-2xl justify-self-center items-center w-11/12 px-2 h-2/3'>
      <EmojiTable emojiOpen={emojiOpen} setEmojiOpen={setEmojiOpen} setMessage={props.setMessage} />
      <GiphyTable giphyOpen={giphyOpen} setGiphyOpen={setGiphyOpen} sendGiphy={props.sendGiphyToServer}/>
      <textarea className='msg-text-area bg-white resize-none w-full h-full align-center px-[7px] py-[1.5px] text-sm focus: outline-0' placeholder='Say something' value={props.message} onChange={(e) => props.setMessage(e.target.value)}/>
      <PaperAirplaneIcon id="sendMessageButton" className='ml-1 w-5 h-5 text-black bg-white' onClick={props.sendToServer}/>
    </div>
  );
};

export default InputArea;