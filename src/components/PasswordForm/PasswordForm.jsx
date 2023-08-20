import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './PasswordForm.css';

export default function PasswordForm({user, setUser}) {

  const [serviceName, setServiceName] = useState('');
  const [password, setPassword] = useState('')


  useEffect(()=>{
    const getUser = async () => {
     fetch('http://localhost:3001/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
            'Access-Control-Allow-Credentials':true,
        },
     }).then((response)=>{
        console.log(response)
        if(response.status === 200) return response.json();
        throw new Error ('authentication has been failed'); 
     }).then((resObject)=>{
        setUser(resObject.user)
     })
      }
    getUser();
  },[])

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  }

  const handleServicePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  
  console.log(user)

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
