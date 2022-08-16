import React from "react";
import Conversation from "./Conversation";
import MatchesListHeader from './MatchesListHeader';
import MatchBubble from './MatchBubble';
import NoMatches from "./NoMatches";
import {useState, useEffect} from 'react';
import io from 'socket.io-client';

export default function Matches(props) {
  const [selected, setSelected] = useState(null);
  const [matchesData, setMatchesData] = useState({});
  const [socket, setSocket] = useState();
  const [message, setMessage] = useState('');
  const [matchIds, setMatchIds] = useState([]);

  // Click handler to set current view/chat 
  const selectHandler = (matchObj) => {
    setSelected(matchObj);
  };

  // Building new form of matches data with filtered messages
  useEffect(() => {
    const data = {};
    const arr = [];
    for (const match of props.matches) {
      data[match.id] = {
        id: match.id,
        name: match.name,
        seen: match.seen,
        seen_ref_id: match.seen_ref_id,
        photos: [...match.photos],
        messages: props.allMessages.filter(msg => msg.to_user_id === match.id || msg.from_user_id === match.id)
      };
      arr.push(match.id);
    };

    setMatchesData({...data});
    setMatchIds([...arr]);
  }, [props.allMessages, props.matches, selected]);

  // socket io handlers
  useEffect(() => {
    const socket = io();
    setSocket(socket);
    socket.on('connect', () => {
      const data = {id: props?.user?.id, name: props?.user?.name,}
      socket.emit('user', data);
    });

    socket.on('disconnect', () => {
      console.log('disconnected from client');
    });

    socket.on("message", (message) => {
      if (message.from_user_id === props.user.id || message.to_user_id === props.user.id) {
        props.setAllMessages(prev => [...prev, message]);
      }
    });

    // clean up
    return () => {
      socket.disconnect();
    };
  }, []);

  // gets called when send button is clicked
  const sendToServer = () => {
    if (message) {
      const msgData = {
        from_user_id: props.user.id,
        message: message,
        to_user_id: selected.id,
        message_seen: false,
        date_sent: Date.now()
      };
      socket.emit('sendMessage', msgData);
      setMessage('');
    } else {
      console.log('need to type something');
    }
  };

  const sendGiphyToServer = (url) => {
    if (url) {
      const msgData = {
        from_user_id: props.user.id,
        message: url,
        to_user_id: selected.id,
        message_seen: false,
        date_sent: Date.now()
      };
      socket.emit('sendMessage', msgData);
      setMessage('');
    } else {
      console.log('need to type something');
    }
  };

  if (props.matches.length === 0) {
    return (
      <section className="user-card-container w-full place-content-center">
        <NoMatches />
      </section>
    )
  }

  // map over list of confirmed matches and display bubbles
  const match = props.matches?.map(match => {
    return (
      <MatchBubble
        key={match.id}
        matchData={matchesData[match.id]}
        userId={props.user}
        selectHandler={selectHandler}
        selected={selected}
        seenUpdate={props.seenUpdate} 
        setSeenUpdate={props.setSeenUpdate}
        setMatchesData={setMatchesData}
        setMessageSent={props.setMessageSent}
      />
    );
  });

  return (
    <div className='outer-most-matches-div grid'>
      <Conversation 
        selected={selected} 
        user={props.user} 
        sendToServer={sendToServer}
        allMessages={props.allMessages} 
        setAllMessages={props.setAllMessages} 
        setMessageSent={props.setMessageSent}
        message={message}
        setMessage={setMessage}
        matchesData={matchesData}
        sendGiphyToServer={sendGiphyToServer}
      />
      <MatchesListHeader user={props.user} />
      <div className="bg-white matches-bubble-list flex flex-col border-l border-t border-b border-gray-300 py-1">
        {match ? match : "loading"}
      </div>
    </div>
  );
};
