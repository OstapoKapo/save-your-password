import React,{useEffect, useRef, useState} from 'react';
import './LogIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LogIn({user, setUser}) {
  
  const navigate = useNavigate()

  const passwordVisibility = useRef(null);

  const handlePasVisibility = () => {
    if (passwordVisibility.current.type === "password") {
      passwordVisibility.current.type = "text";
    } else {
      passwordVisibility.current.type = "password";
    }
  }

  const googleFunction = () => {
    window.open('http://localhost:3001/auth/google', '_self')
  }


  const [inputValues, setInputValues] = useState({
    logIn__inputEmail: '',
    logIn__inputPassword: '',
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

  try {
      await axios.post('http://localhost:3001/signup-data', {inputValues})
      .then((response) => {
          response.status === 200 ? navigate('/PasswordForm') : alert('somethin went wrong');
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
    <div className="signUp">
      <form action="POST">
        <input type="text "value={inputValues.logIn__inputEmail} onChange={handleChange} placeholder='Email' className='signUp__inp' name='signUp__inputEmail'/>
        <input type="password" value={inputValues.logIn__inputPassword} ref={passwordVisibility} onChange={handleChange} placeholder='Password' className='signUp__inp' name='signUp__inputPassword'/>
        <div className="signUp__row">
          <input type="checkbox"  onClick={handlePasVisibility}/>Show Password
        </div>
        <button type='submit' className='signUp__btn' onClick={sendSignUpData}>Log In</button>
        
      </form>
      <button onClick={googleFunction}>sadasdas</button>
    </div>
  )
}
