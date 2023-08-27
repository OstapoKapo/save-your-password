import React,{useState, useRef, useEffect} from 'react';
import './SeePassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordItems from './PasswordItems/PasswordItems';

export default function SeePassword({user}) {

  const [passwords, setPasswords] = useState(null);
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
            console.log(target.getAttribute('data-action'))
          };
    }
  }

  useEffect(()=>{
   async function getPasswords () {
        try {
            await axios.post('http://localhost:3001/takePasswords', {email})
            .then((response) => {
              setPasswords(response.data)
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

  console.log(passwords);

  return (
    <div className="seePassword">
        <div className="seePassword__item">
          <h1 className='seePassword__header'>Filter</h1>
          <div className="seePassword__item__main">
            <div ref={filter} onClick={handleFilter} className="seePassword__filter">
                <div data-action='newest' className="seePassword__filter__item">The Newest</div>
                <div data-action='mostUsed' className="seePassword__filter__item">The Most Used</div>
                <div data-action='oldest' className="seePassword__filter__item">The Oldest</div>
            </div>
          </div>
        </div>
        <div className="seePassword__item seePassword__item_center">
          <h1 className='seePassword__header'>All Your Passwords 🔑</h1>
          <div className="seePassword__item__main seePassword__item__main_center">
           {passwords ? passwords.map((item) => <PasswordItems key={item._id} appName={item.appName} appPassword={item.appPassword}/>) : '' }
          </div>
        </div>
        <div className="seePassword__item">
          <h1 className='seePassword__header'>Search</h1>
          <div className="seePassword__item__main seePassword__item__main_last"></div>
        </div>
    </div>
  )
}
