
import React from 'react'
import Styles from './Header.module.css'
import ResumeSVG from '../assets/resume.svg'
import Body from "./Body"

export default function Header() {
  return (
    <React.Fragment>
    <div className={Styles.container}>    
            <div className={Styles.left}>
            <div className={Styles.heading}>
                <p>A <span>Resume</span> That Stands Out!</p>
                <p>Make Your Own Resume.<span>It's Free</span></p>
          
            </div>
            </div> 
            <div className={Styles.right}>
                <img src={ResumeSVG} alt='resumeimage'/>
                {/* <ResumeSVG/> */}
           
        </div>
      
    </div>
    <Body/>
    </React.Fragment>
  )
}
