import { useState, useEffect } from 'react';
import axios from 'axios';

// initial state
const reset = {
  loggedIn: false,
  user: {},
  state: {},
  allMessages: [],
  messageSent: false,
  preferences: {},
  prefOptions: {},
  matches: [],
  swipeHistory: [],
  filtered: []
}

const useAppData = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [state, setState] = useState({});
  const [allMessages, setAllMessages] = useState([]);
  const [messageSent, setMessageSent] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [prefOptions, setPrefOptions] = useState({});
  const [matches, setMatches] = useState([])
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [seenUpdate, setSeenUpdate] = useState(0);
  const [filtered, setFiltered] = useState([]);

  // reset states on logout
  const resetStates = () => {
    setLoggedIn(reset.loggedIn);
    setUser({...reset.user});
    setState({...reset.state});
    setAllMessages([...reset.allMessages]);
    setMessageSent(reset.messageSent);
    setPreferences({...reset.preferences});
    setPrefOptions({...reset.prefOptions});
    setMatches([...reset.matches]);
    setSwipeHistory([...reset.swipeHistory]);
    setFiltered([...reset.filtered]);
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

  // get your profile data
  useEffect(() => {
    axios.get('/api/users')
      .then((results) => {
        setUser({...results.data}) 
      })
      .catch((error) => console.log('error', error));
  }, [loggedIn]);

  // Getting users current preferences settings
  useEffect(() => {
    axios.get('/api/users/preferences')
      .then((results) => {
        setPreferences({...results.data});
      })
    }, [loggedIn]);

  // promise chain for setting initial states
  // Depency: Will likely depend on swiping state
  useEffect(() => {
    if (loggedIn) {
      Promise.all([
      axios.get('/api/users/all'),
      axios.get('/api/users/likedBy')
      ])
      .then((all) => {
        setState({...state, 
          users: all[0].data, 
          likedBy: all[1].data
        });
        return all[0].data;
      })
      .then((everyone) => {
        const newList = [];
        everyone.forEach((person) => {
          if ((person.gender_id === preferences.genders) 
            && (person.location === preferences.location)
            && ((person.age <= preferences.max_age) && (person.age >= preferences.min_age))
            && ((person.height_in_cm <= preferences.max_height_in_cm) && (person.height_in_cm >= preferences.min_height_in_cm))
          ) {
            newList.push(person);
          }
        });
        return newList;
      })
      .then((displayUsers) => {
        if (displayUsers.length < 1) {
          setFiltered([]);
        } else {
          setFiltered([...displayUsers]);
        }
      })
    }

  }, [loggedIn, preferences, matches]);

  // Getting list of all messages
  useEffect(() => {
    axios.get('/api/users/messages')
      .then((msgs) => {
        setAllMessages([...msgs.data])
      });
  }, [messageSent, loggedIn, seenUpdate]);

  // Get all preference options
  useEffect(() => {
    axios.get('/api/preferences')
      .then((results) => {
        setPrefOptions({...results.data});
      })
      .catch((error) => console.log('error', error));
  }, []);

  // Getting list of confirmed matches
  useEffect(() => {
    axios.get('/api/users/matchings')
      .then((matches) => {
        setMatches([...matches.data]);
      })
      .catch((error) => console.log('error', error));
  }, [swipeHistory, loggedIn, seenUpdate]);

  // like user - takes in swiped on Ids and like value:boolean
  const swipeUser = (toId, like) => {
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
  const updatePreferences = (newPrefSettings) => {
    const newPref = {...newPrefSettings};
    axios.post('/api/users/preferences', newPref)
    .then((results) => {
      setPreferences({...results.data});
    })
    .catch(error => console.log(error));
  };

  // SIGN OUT FUNCTION AND BUTTON
  const handleClickLogOut = (e) => {
    e.preventDefault();
    axios.post('/logout')
      .then((results) => {
        setLoggedIn(false);
        resetStates();
      })
      .catch((error) => console.log('err:', error));
  };

  // Updating user profile 
  const updateProfile = (newValues) => {
    const newProfileValues = newValues;
    axios.post('/api/users/edit', newProfileValues)
      .then((results) => {
        const oldProfile = user;
        const updatedUser = {...oldProfile, ...results.data[0]};
        setUser({...updatedUser});
      })
      .catch((error) => {
        console.log('error:', error);
      });
  };

  return {
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
    filtered, setFiltered
  }
};

export default useAppData;