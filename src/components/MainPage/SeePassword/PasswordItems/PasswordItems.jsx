import React from 'react';
import './PasswordItems.css';
import CryptoJS from 'crypto-js'
import copyImg from './img/copy.png';
import editImg from './img/edit.png';
import deleteImg from './img/delete.png';

export default function PasswordItems(props) {

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
  

  return (
    <div className="contentBlock">
      <div className="contentBlock__text">{props.appName}</div>
      <input type="password" className='contentBlock__input' value={descryptPassword}/>
      <div className="contentBlock__row">
          <div className="contentBlock__img" onClick={handleCoppy}>
            <img src={copyImg} alt="copy" />
          </div>
          <div className="contentBlock__img">
            <img src={editImg} alt="copy" />
          </div>
          <div className="contentBlock__img">
            <img src={deleteImg} alt="copy" />
          </div>
        </div>
    </div>
  )
}
