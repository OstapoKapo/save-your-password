import React,{useState, useEffect, } from 'react';
import axios from 'axios'

export default function Google({user, setUser}) {


    const googleFunction = () => {
        window.open('http://localhost:3001/auth/google', '_self')
      }


  return (
    <div>
        <button onClick={googleFunction}>sadasdas</button>
    </div>
  )
}
