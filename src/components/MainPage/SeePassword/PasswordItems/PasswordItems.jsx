import React, { useRef, useState, useEffect } from 'react';
import './PasswordItems.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'
import copyImg from './img/copy.png';
import editImg from './img/edit.png';
import deleteImg from './img/delete.png';
import Confirm from './img/confirm.png';

export default function PasswordItems(props) {

  const navigate = useNavigate();

  const [changeKey, setChangeKey] = useState(false);


  const passwordInp = useRef(null)

  let email = props.email;


  const secretPass = "XkhZG4fW2t2W";

  
   const bytes = CryptoJS.AES.decrypt(props.appPassword, secretPass);
   let [descryptPassword, setDescryptPassword] = useState(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))


   const handleCoppy = async (e) => {

    let target = e.target;
    let targetParent = target.closest(".contentBlock__row");
    let mainParent = target.closest('.contentBlock');
    let mainParentId = mainParent.id;
    let input = targetParent.previousSibling
      input.type = "text";
      input.select();
      document.execCommand("copy");
      e.preventDefault();
      const timeOut = setTimeout(() => {
        input.type = "password";
        console.log('ddd')
      }, 3000);
      await axios.post('http://localhost:3001/coppyPassword', {mainParentId, email})
      .then((response) => {
        if(response.status !== 404){ 
        
        }else{
          alert('somethin went wrong');
        }
      })
      .catch((error) => {
          console.error('Error:', error);
      }); 
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

  

   const changeHandle = async (e) => {
    setChangeKey(true);
    let target = e.target;
    let input = target.closest(".contentBlock__row").previousSibling;
    input.type = "text";
   }

   
    const inputHandle= (e) => {
      if(changeKey){
        setDescryptPassword(e.target.value);
      }
    } 
   

   const sumbitChangePasswrod = async (e) => {
    let target = e.target;
    let mainParent = target.closest('.contentBlock');
    let mainParentId = mainParent.id;
    let input = target.closest(".contentBlock__row").previousSibling;
    input.type = "password";
    const encryptPassword = CryptoJS.AES.encrypt(JSON.stringify(descryptPassword),secretPass).toString();
    console.log(encryptPassword)
    setChangeKey(false);
    await axios.post('http://localhost:3001/changePassword', {mainParentId, encryptPassword, email})
      .then((response) => {
        if(response.status !== 404){ 
          
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
      {/* <div className="contentBlock__avatar">
        <img src={`http://favicongrabber.com/api/grab/dev.to`} alt="" />
      </div> */}
      <div className="contentBlock__text">{props.appName}</div>
      <input type="password" ref={passwordInp} className='contentBlock__input' onChange={inputHandle} value={descryptPassword}/>
      <div className="contentBlock__row">
          <div className="contentBlock__img" onClick={handleCoppy}>
            <img src={copyImg} alt="copy" />
          </div>
          {changeKey ? <div className="contentBlock__img" onClick={sumbitChangePasswrod}><img src={Confirm} alt="copy" /></div> : <div className="contentBlock__img" onClick={changeHandle}><img src={editImg} alt="copy" /></div>}
          <div className="contentBlock__img" onClick={deleteHandle}>
            <img src={deleteImg} alt="copy" />
          </div>
        </div>
    </div>
  )
}
