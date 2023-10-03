import React, { useEffect, useState,useRef } from 'react'
import Styles from './Body.module.css'
import Arrow from '../assets/arrow-down.svg'
import Editor from './Editor.js'
import Resume from './Resume.js'
import ReactToPrint from 'react-to-print'
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
  //   useEffect(()=>{
  //    console.log(sections[basicInfo])
  //  },[])
    // useEffect(()=>{
    // console.log(resumeInfo);
    // console.log(activeColor);
    // },[resumeInfo]);
  //  console.log("ref"+resumeRef);
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
        <div className={Styles.download}>
        <ReactToPrint
          trigger={() => {
           
            return <button>Download<img src={Arrow} alt="arrow"/></button>
          }}
          pageStyle='@page { size: auto; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; padding: 40px !important; } }'

          content={() => resumeRef.current}
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