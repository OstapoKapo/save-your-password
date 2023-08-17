import React, {useState} from 'react';
import axios from 'axios'
import './PasswordForm.css';

export default function PasswordForm() {

  const [serviceName, setServiceName] = useState('');
  const [password, setPassword] = useState('')

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  }

  const handleServicePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleOnSumbit = async (e) => {
    e.preventDefault();


    try{
        const response = await axios.post('http:///localhost:3001/save-password', {
            serviceName,
            password
        });
        console.log(`Success ${response.data}`);
        setServiceName('');
        setPassword('');
    }catch (err){
        console.log(`Error saving pass ${err}`)
    }
  }

  return (
    <div className="passwordForm">
        <form onSubmit={handleOnSumbit}>
            <input type="text" id='serviceName' placeholder='Name' value={serviceName} onChange={handleServiceNameChange}/>
            <input type="text" id='password' placeholder='password' value={password} onChange={handleServicePasswordChange}/>
        </form>
    </div>
  )
}
