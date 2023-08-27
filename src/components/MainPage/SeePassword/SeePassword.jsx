import React,{useState, useRef, useEffect} from 'react';
import './SeePassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PasswordItems from './PasswordItems/PasswordItems';

export default function SeePassword({user}) {

  let [passwords, setPasswords] = useState(null);

  const filter = useRef(null);

  const email = user.email;

  const navigate = useNavigate();

  const handleFilter = (e) => {
    let target = e.target;
    if(target.classList.contains('seePassword__filter__item')){
        for(let child of filter.current.children){
            if(child !== target){
            child.classList.remove('seePassword__filter__item_active');
            }
          }
          if(!target.classList.contains('seePassword__filter__item_active')){
            target.classList.add('seePassword__filter__item_active');
            let action = target.getAttribute('data-action');
            let newPasswords = [...passwords];
            if(action === 'newest'){
              newPasswords.sort(function(a, b){
                return b.appDate-a.appDate;
              })
              setPasswords(newPasswords);
            }else if(action === 'oldest'){
              newPasswords.sort(function(a, b){
                return a.appDate-b.appDate;
              })
              setPasswords(newPasswords);
            }else{
              newPasswords.sort(function(a, b){
                return b.appViews-a.appViews;
              })
              setPasswords(newPasswords);
            }
          };
    }
  }

  useEffect(()=>{
   async function getPasswords () {
        try {
            await axios.post('http://localhost:3001/takePasswords', {email})
            .then((response) => {
              setPasswords(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        catch(error) {
            console.log(error);
        }
    }
    getPasswords()
  },[])

  return (
    <div className="seePassword">
        <div className="seePassword__main">
          <h1 className='seePassword__header'>All Your Passwords 🔑</h1>
          <div ref={filter} onClick={handleFilter} className="seePassword__filter">
                <div data-action='newest' className="seePassword__filter__item">The Newest</div>
                <div data-action='mostUsed' className="seePassword__filter__item">The Most Used</div>
                <div data-action='oldest' className="seePassword__filter__item">The Oldest</div>
            </div>
          <div className="seePassword__itemsContainer">
            {passwords ? passwords.map((item) => <PasswordItems key={item._id} appName={item.appName} appPassword={item.appPassword}/>) : '' }
          </div>
        </div>
    </div>
  )
}
