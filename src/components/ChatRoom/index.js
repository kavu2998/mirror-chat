import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'react-bootstrap';
import Message from '../Message';

import './index.css';
import {  sendMessageHandler } from '../../state/actions';

function ChatRoom() {
  const [message, setMessage]=useState('');
  const dispatch = useDispatch();

  const messages = useSelector(state => state.userReducer.messages)

    
  const sendHandler = (e) => {
    e.preventDefault();
    dispatch(sendMessageHandler(message));
    setMessage('');
  }

  return (
    <div className='center-chat'>
      <Card className="text-center">
        <Card.Header>
          <div style={{ "display": "flex", "flexDirection": 'row', "alignItems": "center" }}>
            <img src="/assets/logo.jpeg" alt="logo" className="home__avatar-logo" style={{ "display": "block", "width": "50px", "borderRadius": "50%" }} />
            <div style={{ "paddingLeft": "10px", "fontWeight": "bold", "fontSize": "24px", "fontFamily": "cursive" }}>Alice</div>
          </div>
        </Card.Header>
        <Card.Body className='card-message'>
          <div className='messages'>
          
            {
              messages.length > 1 && messages.map((m, i)=> {
                return (
                  i !== 0 && m!== "" ?
                  <Card.Text key={i}>
                  <Message  message={m} me ={true} />
                  <Message  message={m} me ={false} />
                  </Card.Text> : null
                )
              })
            }
          </div>
          
        </Card.Body>
        <Card.Footer >
          <form>
            <input placeholder='Type a message' value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
            <button className='button' onClick={sendHandler}>Go</button>
          </form>
        </Card.Footer>
      </Card>
    </div>

  )
}

export default ChatRoom
