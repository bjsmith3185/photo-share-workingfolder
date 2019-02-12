import React from "react";
import "./OnlineUsers.css";


const OnlineUsers = (props) => (

  <div className="onlineuser-area">
    <div className="onlineuser-title">All Users</div>
    <div className="onlineuser-subtitle">Status: Online <span className="onlineuser-active"></span> ,  Offline <span className="onlineuser-inactive"></span></div>
    <br />

 
        <ol>
          {props.allUsers.map(user => (
            <li key={user._id}>
              <span className="onlineuser-elements">
                <strong>{user.name}</strong> 
                {user.loggedIn ? (
                  <span className="onlineuser-status-true"></span>
                ) : (
                  <span className="onlineuser-status-false"></span>
                )}

              </span>
            </li>
          ))}
        </ol>
     

  </div>
);

export default OnlineUsers;


