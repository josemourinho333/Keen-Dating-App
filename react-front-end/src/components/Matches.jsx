import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import * as ROUTES from './routes';
import Messages from "./MessagesContainer";

export default function Matches(props) {

  const seen = props.messages.filter(a => a.to_user_id === match.id && a.message_seen === true);
console.log("*", seen)
  const match = props.matches.map(match =>   {
return(
  // const seen = false

  <div key={match.id} className={"rounded-xl gap-4 border border-fuchsia-800 border-spacing-5" + seen? "bg-fuchsia-300" : " bg-white "}>
    {/* match.id */}
  <img className="w-12 h-12 cursor-pointer bg-gray-200 font-thin rounded-full object-cover" src={match.photos[0]} href="/users/:id/messages"/>{match.name}

  {/* {props.messages.sort((a,b) => b.date_sent - a.date_sent)} */}

{/* <img className="w-12 h-12 rounded-full pointer-events-none object-cover" src={match.photos[0]} href="/users/:id/messages"/>
{match.name}  */}
  <br />
  </div>
  )

    })


//  props.messages.message_seen;


console.log("state from matches", props)

return (
<>

<div className="grid grid-cols-5 gap-3 w-3/5 mx-auto rounded-2xl border border-spacing-2">
  <div className="bg-blue-100 rounded-3xl border-cyan-900 mt-4 indent-2 font-semibold">
  
                {props.user? props.user[0].name : 'Loading'}
               
  </div>
  
  <div className="bg-red-100 col-span-4">MATCHES NAME</div>
</div>

<div className="grid grid-cols-5 gap-3 w-3/5 mx-auto">
  <div className="rounded-3xl border" >{match}</div>
  <div className="bg-red-100 col-span-4">MESSAGES</div>
</div>



</>
)


}