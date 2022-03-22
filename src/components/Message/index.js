import React from 'react';
import './index.css'

function Message(props) {
  return (
    <>
      {props.message !== '' ? <span className={props.me ? "me" : "alice"} >{props.message}</span> : ''}
      <br />
      <br />
    </>
  )
}

export default Message