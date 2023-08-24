import React,{useState} from 'react';
import './SetPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SetPassword({user}) {

    const navigate = useNavigate();


    const email = user.email

    const [inputValues, setInputValues] = useState({
        setPassword__nameInp: '',
        setPassword__passwordInp:'',
        setPassword__views:0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
        console.log(inputValues);
    };


    async function sendNewApp(e) {
       
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/newApp', {inputValues,email})
            .then((response) => {
              console.log(response)
                if(response.status === 200){
                  navigate('/PasswordForm') 
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
    <div className="setPassword">
        <h1 className='setPassword__header'>Make Your Password 🔑</h1>
        <form >
            <input type="text" name='setPassword__nameInp' className='setPassword__inp' id='setPassword__nameInp' placeholder='Name your App' value={inputValues.setPassword__nameInp} onChange={handleChange}/>
            <input type="text" name='setPassword__passwordInp' className='setPassword__inp' id='setPassword__passwordInp' placeholder='password' value={inputValues.setPassword__passwordInp} onChange={handleChange}/>
        </form>
        <div className="setPassword__row">
          <button type='submit' onClick={sendNewApp} className='setPassword__btn' >Generate 🔐</button>
          <button type='submit' className='setPassword__btn ' >Random Password 🎰</button>
        </div>
    </div>
  )
}
