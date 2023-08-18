import React from 'react';
import './Welcome.css';
import Logo from './img/logo.png';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate()

  const handleLogIn = () => {
    navigate('/LogIn')
  }

  const handleSignUp = () => {
    navigate('/SignUp')
  }

  return (
    <div className="welcome">
        <div className="welcome__main">
            <div className="welcome__main__left">
                <div className="welcome__logo">
                    <div className="welcome__logo__img">
                        <img src={Logo} alt="Logo" />
                    </div>
                </div>
                <div className="welcome__text">Greetings, this app save  all your <span>password</span>🔐 or generate new <span>key</span>🔑 for your different apps. <br /> You need only open <span>KEEPER</span> and copy password for that app what you want</div>
            </div>
            <div className="welcome__main__right">
                <div className="welcome__btn_blue welcome__btn" onClick={handleLogIn}>Log In</div>
                <div className="welcome__btn_purple welcome__btn" onClick={handleSignUp}>Sign Up</div>
            </div>
        </div>
    </div>
  )
}
