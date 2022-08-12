import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UserCardContainer from './components/UserCardContainer';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login-form'
import Nav from "./components/Nav";
import Matches from "./components/Matches";
import Preferences from './components/Preferences';
import { propTypes } from 'react-tinder-card';
import UserCard from './components/UserCard';
import UserProfile from './components/UserProfile';

// initial state
const reset = {
  loggedIn: false,
  user: {},
  state: {},
  allMessages: [],
  messageSent: false,
  preferences: {},
  matches: [],
  swipeHistory: []
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [state, setState] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const [preferences, setPreferences] = useState({});
  const [matches, setMatches] = useState([])
  const [swipeHistory, setSwipeHistory] = useState([]);

  const resetStates = () => {
    setLoggedIn(reset.loggedIn);
    setUser({...reset.user});
    setState({...reset.state});
    setAllMessages([...reset.allMessages]);
    setMessageSent(reset.messageSent);
    setPreferences({...reset.preferences});
    setMatches([...reset.matches]);
    setSwipeHistory([...reset.swipeHistory]);
  };

  // if req.session.user_id exists, set loggedIn to true
  useEffect(() => {
    axios.get('/loggedIn')
      .then((results) => {
        if (results.data) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
  }, [loggedIn]);

  useEffect(() => {
    axios.get('/api/users')
      .then((results) => {
        setUser({...results.data}) 
      })
      .catch((error) => console.log('error', error));
  }, [loggedIn])
  
  // promise chain for setting initial states
  // Depency: Will likely depend on swiping state
  useEffect(() => {
    if (loggedIn) {
      Promise.all([
      axios.get('/api/users/all'),
      axios.get('/api/users/likedBy'),
      axios.get('/api/matched-users')
      ])
      .then((all) => {
        setState({...state, 
          users: all[0].data, 
          likedBy: all[1].data,
          matchedUsers: all[2].data
        });
      }) 
    }
    // Discusss if we need cleanUp for Effect Hook
    // return () => axios.isCancel()
  }, [loggedIn]);

  // Getting list of all messages
  useEffect(() => {
    axios.get('/api/users/messages')
      .then((msgs) => {
        setAllMessages([...msgs.data])
      });
  }, [messageSent, loggedIn]);

  // Getting users current preferences settings
  useEffect(() => {
    axios.get('/api/users/preferences')
      .then((results) => {
        setPreferences({...results.data});
      })
  }, [loggedIn]);

  // Getting list of confirmed matches
  useEffect(() => {
    axios.get('/api/users/matchings')
      .then((matches) => {
        setMatches([...matches.data]);
      })
      // return () => axios.isCancel()
  }, [swipeHistory, loggedIn])

  // like user - takes in swiped on Ids and like value:boolean
  const swipeUser = (toId, like) => {
    console.log("your swiped data in app.js:", {toId, like});
    axios.post('/api/users/matchings', {toId, like})
      .then((response) => {
        const freshSwipe = response.data[0];
        setSwipeHistory(prev => [...prev, freshSwipe])
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  // Update users preferences
  const updatePreferences = () => {
    const newPref = {
      ...preferences,
      location: 'testtt'
    };
    console.log('newPref', newPref);
    axios.post('/api/users/preferences', newPref)
    .then((results) => {
      setPreferences({...results.data})
    })
    .catch(error => console.log(error));
  };

  // block a user
  const blockUser = (blockId) => {
    axios.post('/api/users/blocked', { blockId })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // SIGN OUT FUNCTION AND BUTTON
  const handleClickLogOut = (e) => {
    e.preventDefault();
    console.log('Logn out clicked');
    axios.post('/logout')
      .then((results) => {
        console.log('rep session', results);
        setLoggedIn(false);
        resetStates();
      })
      .catch((error) => console.log('err:', error));
  }

  // Updating user profile 
  const updateProfile = (newValues) => {
    const newProfileValues = newValues;
    console.log('newvalues from newProfileValues', newProfileValues);
    axios.post('/api/users/edit', newProfileValues)
      .then((results) => {
        const oldProfile = user;
        const updatedUser = {...oldProfile, ...results.data[0]};
        console.log('updated user', updatedUser);
        setState({...state, user: [updatedUser]});
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  // Render the following if state is empty and loggedIn as a user to wait until fetch is complete
  // likely have a ne component so it can look real nice for the loading page.
  if (
    loggedIn 
    && Object.keys(state).length < 1 
    && matches.length < 1
    && allMessages.length < 1
    && Object.keys(preferences).length < 1
    ) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={
          !loggedIn 
          ? <LoginForm setLoggedIn={setLoggedIn} /> 
          : <>
              <Nav state={state} user={user} handleClickLogOut={handleClickLogOut}/>
              <UserCardContainer 
                users={state.users}
                preferences={preferences}
                likedBy={state.likedBy}
                swipeUser={swipeUser}
                profile={false}
              />
            </>
        } />

        <Route path='/profile' element={
          !loggedIn 
            ? <LoginForm setLoggedIn={setLoggedIn} /> 
            : <>
                <Nav state={state} user={user} handleClickLogOut={handleClickLogOut}/>
                <UserCardContainer 
                  user={user}
                  profile={true}
                  editMode={false}
                  updateProfile={updateProfile}
                />
              </>
        } />

        <Route path='/userprofile' element={
          !loggedIn 
            ? <LoginForm setLoggedIn={setLoggedIn} /> 
            : <>
                <Nav state={state} user={user} handleClickLogOut={handleClickLogOut}/>
                <UserCardContainer 
                  user={matches}
                  profile={false}
                  editMode={false}
                  updateProfile={updateProfile}
                  matchedProfile={true}
                />
              </>
        } />

        <Route path='/login' element={
          !loggedIn 
            ? <LoginForm setLoggedIn={setLoggedIn} /> 
            : <>
                <Nav state={state} user={user} handleClickLogOut={handleClickLogOut} />
                <UserCardContainer 
                  users={state.users}
                  preferences={preferences}
                  likedBy={state.likedBy}
                  swipeUser={swipeUser}
                  profile={false}
                />
              </>
        } />

        <Route path='/matches' element={
          !loggedIn 
            ? <LoginForm setLoggedIn={setLoggedIn} /> 
            : <>
                <Nav state={state} user={user} handleClickLogOut={handleClickLogOut} />
                <Matches state={state} user={user} matches={matches} allMessages={allMessages} setAllMessages={setAllMessages} messageSent={messageSent} setMessageSent={setMessageSent}/>
              </>
        } />

        <Route path='/preferences' element={
          !loggedIn 
            ? <LoginForm setLoggedIn={setLoggedIn} /> 
            : <>
                <Nav state={state}user={user}  handleClickLogOut={handleClickLogOut} />
                <Preferences preferences={preferences} user={user} matches={matches} allMessages={allMessages} setAllMessages={setAllMessages} messageSent={messageSent} setMessageSent={setMessageSent}/>
              </>
        } />  
{/* 
        <Route path={`/userprofile/:name`} element={
          <UserProfile
          users={state.matchedUsers}/>

        } />      */}

      </Routes>
    </div>
  );
}

export default App;