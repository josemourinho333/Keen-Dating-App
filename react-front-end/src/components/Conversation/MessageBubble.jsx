import { MoonIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import moment from 'moment';

const MessageBubble = (props) => {
  const [selected, setSelected] = useState(false);

  const selectMsg = () => {
    !selected ? setSelected(true) : setSelected(false);
  };

  if (props.userId !== props.from) {
    return (
      <>
        <div onClick={() => selectMsg()} className='justify-self-center self-start bg-gray-100 text-gray-800 font-light rounded-xl px-3 py-1 text-sm min-w-max my-1 mr-2 relative'>
          <div className='relative bg-gray-100 z-50 whitespace-pre-line'>{props.content.includes("https://text.media.giphy.com/") ? <img 
          className='object-scale-down h-24 w-32'
          src={props.content} alt='' /> : props.content}</div>
          <MoonIcon className='rotate-90 bg-transparent text-gray-100 w-5 h-5 absolute top-4 -left-1'/>
        </div>
        { selected 
          ? <div className="bg-white text-gray-600 text-[11px] min-w-max mt-1">{moment(props.date).format("MMM Do h:mm a")}</div>
          : <></>
        }
      </>
    );
  };

  return (
    <>
    <div onClick={() => selectMsg()} className='justify-self-center self-end bg-fuchsia-800 text-white font-light rounded-xl px-3 py-1 text-sm min-w-max my-1 mr-2 relative'>
      <div className='relative bg-fuchsia-800 z-50 whitespace-pre-line'>{props.content.includes("https://text.media.giphy.com/") ? <img 
      className='object-scale-down h-24 w-32'
      src={props.content} alt='' /> : props.content}</div>
      <MoonIcon className='rotate-45 bg-transparent text-fuchsia-800 w-5 h-5 absolute top-3 -right-2'/>
    </div>
    { selected 
      ? <div className="bg-white text-gray-600 text-[11px] min-w-max mt-1 mr-2 text-end">{moment(props.date).format("MMM Do h:mm a")}</div>
      : <></>
    }
    </>
  );
};

export default MessageBubble;