import MatchHeader from './MatchHeader';
import ChatRoom from './ChatRoom';

const Conversation = (props) => {

  return (
    <div className='conversation-container grid border border-gray-300'>
      { props.selected 
        ? <>
          <MatchHeader selected={props.selected}/>
          <ChatRoom 
            selected={props.selected} 
            user={props.user} 
            sendToServer={props.sendToServer}
            allMessages={props.allMessages} 
            setAllMessages={props.setAllMessages} 
            setMessageSent={props.setMessageSent} 
            setMessage={props.setMessage}
            message={props.message}
            matchesData={props.matchesData}
            sendGiphyToServer={props.sendGiphyToServer}
          />
          </>
        : <div className='none-selected'> Send a message to one of your matches </div>
      }
    </div>
  )
};

export default Conversation;