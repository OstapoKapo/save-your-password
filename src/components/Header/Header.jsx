import React,{useState, useEffect} from 'react';
import './Header.css';
import Logo from './img/logo.png'

export default function Header(props) {


  const handleLogOut = () => {
    window.open('http://localhost:3001/auth/logout', '_self')
  }
  
  

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">       
            <img src={Logo} alt="Logo" />
        </div>      
      </div>
      <div className="header__right">
        <div className="header__profile">
          <div className="header__polygon"></div>
          <div className="header__avatar">
            {props.avatar === 'none' ?  props.given_name.charAt(0).toUpperCase() + props.family_name.charAt(0).toUpperCase() : <img src={props.avatar} alt="" />}
          </div>
          <div className="header__name">{props.name}</div>
        </div>
        <button className='header__logOutBtn' onClick={handleLogOut}>LogOut</button>
      </div>
    </div>
  )
}
