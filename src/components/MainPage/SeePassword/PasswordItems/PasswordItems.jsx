import React from 'react';
import './PasswordItems.css';
import copyImg from './img/copy.png';
import editImg from './img/edit.png';
import deleteImg from './img/delete.png';

export default function PasswordItems(props) {
  return (
    <div className="contentBlock">
      <div className="contentBlock__text">{props.appName}</div>
      <input type="password" className='contentBlock__input' value={props.appPassword}/>
      <div className="contentBlock__row">
          <div className="contentBlock__img">
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
