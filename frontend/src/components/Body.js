import React, { useEffect, useState,useRef } from 'react'
import Styles from './Body.module.css'
import Arrow from '../assets/arrow-down.svg'
import Editor from './Editor.js'
import Resume from './Resume.js'
import ReactToPrint from 'react-to-print'
import axios from 'axios'
// import {ArrowDown} from 'react-feather'

export default function Body() {
    const colors=["rgba(0,0,0,0)","rgba(255, 0, 0, 0.09)","rgba(128,128,128,0.1)","rgba(0,128,128,0.1)","rgba(0,0,255,0.2)","rgba(205,179,164,0.4)"];
    const[activeColor,setActiveColor]=useState(colors[0]);
    const sections={
      basicInfo:"Basic Info",
      workExp:"Work Experience",
      project:"Project",
      education:"Education",
      achievements:"Achievements",
      summary:"summary",
      other:"Others"
    }
   
   const resumeRef=useRef();
    
   const [resumeInfo,setResumeInfo] =useState({
  [sections.basicInfo]:{
        id:sections.basicInfo,
        sectionTitle:sections.basicInfo,
        detail:{}
     },
  [sections.workExp]:{
      id:sections.workExp,
      sectionTitle:sections.workExp,
      details:[]
  },
  
  [sections.project]:{
   id:sections.project,
   sectionTitle:sections.project,
    details:[]
  },
  [sections.education]:{
    id:sections.education,
    sectionTitle:sections.education,
    details:[]
  },
  [sections.achievements]:{
    id:sections.achievements,
    sectionTitle:sections.achievements,
    points:[]
  },
  [sections.summary]:{
   id:sections.summary,
   sectionTitle:sections.summary,
    detail:""
 },
 [sections.other]:{
  id:sections.other,
  sectionTitle:sections.other,
  detail:""
},  


   }) ;
   const  storeInDB=async()=>{
    console.log("in db");
    console.log(JSON.stringify(resumeInfo))
    try {
      const response = await fetch('http://localhost:8000/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeInfo),
      });
      if (response) {
        console.log('response+'+response.status);
      } else {
        // Handle errors
        console.log(response)
        console.error('Data not saved');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
    // console.log("ref"+resumeRef);
    // for(let key in resumeRef){
    //    console.log(key)
    // }
  return (
    <div className={Styles.container}>
        <p className={Styles.heading}>
           Resume Builder
        </p>
       <div className={Styles.toolbar}>
        <div className={Styles.colors}>
            {colors.map((item)=>(
                <span 
                key={item}
                className={`${Styles.color} && ${activeColor===item? Styles.active:""}`}
                style={{backgroundColor:item}}
                onClick={()=>setActiveColor(item)}
                 />     
           ))}
        </div>
        <div className={Styles.download} onClick={storeInDB}>
        <ReactToPrint
          trigger={() => {
           
            return <button>Download<img src={Arrow} alt="arrow"/></button>
        
          }}
          pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'

          content={() => resumeRef.current}
        
          // </div>
        />
       
        </div>
       </div>
       <div className={Styles.editor}>
      <Editor sections={sections} resumeInfo={resumeInfo} setInformation={setResumeInfo}/></div>
      <Resume ref={resumeRef} sections={sections} information={resumeInfo} activeColor={activeColor}/>
    </div>
  );
}
//