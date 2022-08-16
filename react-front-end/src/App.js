import React from 'react';
import './App.css';
import UserCardContainer from './components/UserCardContainer';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/login-form'
import Nav from "./components/Nav";
import Matches from "./components/Matches";
import CheckUserProfile from "./components/CheckUserProfile";
import useAppData from './hooks/useAppData';

const App = () => {

  const {
    resetStates,
    loggedIn, setLoggedIn,
    user, setUser,
    state, setState,
    allMessages, setAllMessages,
    messageSent, setMessageSent,
    preferences, setPreferences,
    prefOptions, setPrefOptions,
    matches, setMatches,
    swipeHistory, setSwipeHistory,
    seenUpdate, setSeenUpdate,
    swipeUser,
    updatePreferences,
    handleClickLogOut,
    updateProfile,
    filtered, setFiltered,
  } = useAppData();

  // Render the following if state is empty and loggedIn as a user to wait until fetch is complete
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
              <Nav state={state} user={user} handleClickLogOut={handleClickLogOut} allMessages={allMessages} matches={matches} swipeUser={swipeUser}/>
              <UserCardContainer 
                users={state.users}
                preferences={preferences}
                likedBy={state.likedBy}
                swipeUser={swipeUser}
                profile={false}
                filtered={filtered}
              />
            </>
        } />

        <Route path='/profile' element={
          !loggedIn 
            ? <LoginForm setLoggedIn={setLoggedIn} /> 
            : <>
                <Nav state={state} user={user} handleClickLogOut={handleClickLogOut} allMessages={allMessages} matches={matches} swipeUser={swipeUser}/>
                <UserCardContainer 
                  user={user}
                  profile={true}
                  editMode={false}
                  updateProfile={updateProfile}
                  prefOptions={prefOptions}
                />
              </>
        } />

        <Route path='/login' element={
          !loggedIn 
            ? <LoginForm setLoggedIn={setLoggedIn} /> 
            : <>
                <Nav state={state} user={user} handleClickLogOut={handleClickLogOut} allMessages={allMessages} matches={matches} swipeUser={swipeUser}/>
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
                <Nav state={state} user={user} handleClickLogOut={handleClickLogOut} allMessages={allMessages} matches={matches} swipeUser={swipeUser}/>
                <Matches state={state} user={user} matches={matches} allMessages={allMessages} setAllMessages={setAllMessages} messageSent={messageSent} setMessageSent={setMessageSent}
                seenUpdate={seenUpdate} setSeenUpdate={setSeenUpdate}
                />
              </>
        } />

        <Route path='/preferences' element={
          !loggedIn 
            ? <LoginForm setLoggedIn={setLoggedIn} /> 
            : !Object.keys(preferences).length  ? <>Loading</>
            : <>
                <Nav state={state} user={user} handleClickLogOut={handleClickLogOut} allMessages={allMessages} matches={matches} swipeUser={swipeUser} />
                <UserCardContainer 
                  user={user}
                  prefs={preferences}
                  prefOptions={prefOptions}
                  profile={false}
                  editMode={false}
                  prefMode={true}
                  updatePreferences={updatePreferences}
                />
              </>
        } />  

        <Route path={`/userprofile/:id`} element={
          !loggedIn 
          ? <LoginForm setLoggedIn={setLoggedIn} /> 
          : <>
            <Nav state={state}user={user}  handleClickLogOut={handleClickLogOut} allMessages={allMessages} matches={matches} swipeUser={swipeUser} />
          <CheckUserProfile
          matchedUsers={matches}/>
          </>
        } />   

      </Routes>
    </div>
  );
}

export default App;