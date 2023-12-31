import React, {useState, useEffect} from 'react';
import './MainPage.css';
import ChoosePage from './ChoosePage/ChoosePage';
import Header from '../Header/Header';
import SetPassword from './setPassword/SetPassword';
import SeePassword from './SeePassword/SeePassword';



export default function MainPage({user, setUser, typeReg, setTypeReg}) {

  const [page, setPage] = useState(true);

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

  return (
    <div className="mainPage">
        <Header name={user.name} given_name={user.given_name} family_name={user.family_name} avatar={user.picture}/>
        <ChoosePage page={page} setPage={setPage}/>
        {page ? <SetPassword page={page} setPage={setPage} user={user}/> : <SeePassword user={user} />} 
    </div>
  )
}
