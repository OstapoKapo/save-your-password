import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './PasswordForm.css';
import Header from '../Header/Header';


export default function PasswordForm({user, setUser, typeReg, setTypeReg}) {

  const [serviceName, setServiceName] = useState('');
  const [password, setPassword] = useState('');

    useEffect(()=>{
      if(typeReg){
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
      }else{

      }
    },[])


  console.log(user)

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
        console.log(`Error saving password ${err}`)
    }
  }

  return (
    <div className="passwordForm">
        <Header name={user.name} given_name={user.given_name} family_name={user.family_name} avatar={user.picture}/>
        <form onSubmit={handleOnSumbit}>
            <input type="text" id='serviceName' placeholder='Name' value={serviceName} onChange={handleServiceNameChange}/>
            <input type="text" id='password' placeholder='password' value={password} onChange={handleServicePasswordChange}/>
        </form>
    </div>
  )
}
