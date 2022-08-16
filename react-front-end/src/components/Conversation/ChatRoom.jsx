import { useState, useEffect } from 'react';
import InputArea from './InputArea';
import MessageBubble from './MessageBubble';

const ChatRoom = (props) => {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const filterMsgs = props.matchesData[props.selected.id].messages.filter(msg => msg.to_user_id === props.selected.id || msg.from_user_id === props.selected.id);
    setFiltered([...filterMsgs]);
  }, [props.matchesData, props.selected.id, props.allMessages]);

  // map over message history and render messages on screen
  const renderedMsgs = filtered?.map((msg) => {
    return (
      <MessageBubble
        key={msg.id}
        id={msg.id}
        content={msg.message}
        to={msg.to_user_id}
        toName={props.selected.name}
        from={msg.from_user_id}
        userName={props.user.name}
        userId={props.user.id}
        date={msg.date_sent}
        message_seen={msg.message_seen}
      />
    )
  });

  return (
    <>
      <div className='bg-white chat-room-container flex flex-col-reverse'>
        <div className="chat-bubble-container bg-white flex flex-col px-4 py-4">
          {renderedMsgs}
        </div>
      </div>
      <InputArea selected={props.selected} user={props.user} message={props.message} setMessage={props.setMessage} sendToServer={props.sendToServer} sendGiphyToServer={props.sendGiphyToServer}/>
    
    </>
  );
};

export default ChatRoom;

