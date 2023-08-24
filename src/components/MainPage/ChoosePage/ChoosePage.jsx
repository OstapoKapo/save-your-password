import React,{useState, useRef} from 'react';
import './ChoosePage.css';


export default function ChoosePage({page, setPage}) {

  const choosePage = useRef(null);

  const handleChoosePage = (e) => {
    let target = e.target;
    if(target.classList.contains('choosePage__item')){
      for(let child of choosePage.current.children){
        if(child !== target){
        child.classList.remove('choosePage__item_active')
        }
      }
      if(!target.classList.contains('choosePage__item_active')){
        target.classList.add('choosePage__item_active');
        setPage(current => !current)
      }
    }
  }

  return (
    <div ref={choosePage} id='choosePage' onClick={handleChoosePage} className="choosePage">
        <div className="choosePage__item choosePage__item_active">Make Password</div>
        <div className="choosePage__item">See Your Passwords</div>
    </div>
  )
}
