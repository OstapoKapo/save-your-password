import React,{useEffect, useRef, useState} from 'react';
import './LogIn.css';
import Google from './img/google.png'
import Github from './img/github.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogIn({user, setUser, typeReg, setTypeReg}) {
  
  const navigate = useNavigate()

  const googleFunction = () => {
    setTypeReg(true)
    window.open('http://localhost:3001/auth/google', '_self')
  }

  const [inputValues, setInputValues] = useState({
    logIn__inputEmail: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    console.log(inputValues);
};

async function sendSignUpData(e) {

  e.preventDefault();
  setTypeReg(false)
  try {
      await axios.post('http://localhost:3001/login', {inputValues})
      .then((response) => {
        console.log(response)
          if(response.status === 200){
            navigate('/PasswordForm') 
            setUser(response.data)
          }else{
            alert('somethin went wrong');
          }
          
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }
  catch(error) {
      console.log(error);
  }

};

  return (
    <div className="logIn">
      <form action="POST">
        <input type="text "value={inputValues.logIn__inputEmail} onChange={handleChange} placeholder='Email' className='logIn__inp' name='logIn__inputEmail'/>
        <button type='submit' className='logIn__btn' onClick={sendSignUpData}>Log In</button>
      </form>
      <div className="logIn__row">
        <div onClick={googleFunction} className="logIn__googleAuth">
          <img src={Google} alt="Google" />
        </div>
      </div>
    </div>
  )
}
