import React from 'react';
import './PasswordItems.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'
import copyImg from './img/copy.png';
import editImg from './img/edit.png';
import deleteImg from './img/delete.png';

export default function PasswordItems(props) {

  const navigate = useNavigate();

  let email = props.email;


  const secretPass = "XkhZG4fW2t2W";

   const bytes = CryptoJS.AES.decrypt(props.appPassword, secretPass);
   const descryptPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

   const handleCoppy = (e) => {
    let target = e.target;
    let targetParent = target.closest(".contentBlock__row");
    console.log(targetParent)
    let input = targetParent.previousSibling
      input.type = "text";
      input.select();
      document.execCommand("copy");
      e.preventDefault();
      const timeOut = setTimeout(() => {
        input.type = "password";
        console.log('ddd')
      }, 3000);
   }

   const  deleteHandle = async (e) => {
      let target = e.target;
      let mainParent = target.closest('.contentBlock');
      let mainParentId = mainParent.id;
      await axios.post('http://localhost:3001/deleteApp', {mainParentId, email})
      .then((response) => {
        if(response.status !== 404){ 
          props.setPasswords(response.data)
        }else{
          alert('somethin went wrong');
        }
      })
      .catch((error) => {
          console.error('Error:', error);
      }); 
   }
  

  return (
    <div className="contentBlock" id={props.appName}>
      <div className="contentBlock__text">{props.appName}</div>
      <input type="password" className='contentBlock__input' value={descryptPassword}/>
      <div className="contentBlock__row">
          <div className="contentBlock__img" onClick={handleCoppy}>
            <img src={copyImg} alt="copy" />
          </div>
          <div className="contentBlock__img">
            <img src={editImg} alt="copy" />
          </div>
          <div className="contentBlock__img" onClick={deleteHandle}>
            <img src={deleteImg} alt="copy" />
          </div>
        </div>
    </div>
  )
}
