import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import Styles from "./Editor.module.css";
import InputControl from "./InputControl";
import axios from "axios";

export default function Editor(props) {
  let sections = props.sections;
  let information = props.resumeInfo;

  // console.log(sections); //is a object which holds all the seven sections.
  // console.log(Object.keys(sections));//array that holds the keys of the section.
  // console.log(sections[Object.keys(sections)[0]]); //The value of the key which is "basic info"
  // console.log(sections[activeKey])   //same answer as above as Object.keys(sections)[0]=activekey
  // console.log(sections.basicInfo); //will give the same result as above 
console.log(information[sections.workExp]?.details)

  const[sectionTitle,setSectionTitle]=useState(sections[Object.keys(sections)[0]]);
  const [activeKey, setactiveKey] = useState(Object.keys(sections)[0]);
  const[activeDetailIndex,setActiveDetailIndex]=useState(0)
  const [values,setValues]=useState({
    basicInfo:information[sections.basicInfo]?.detail?information[sections.basicInfo].detail:{},
    //  workExp:information[sections.workExp].details?information[sections.workExp].details:[{}],
    // workExp:Array.from(information[sections.workExp].details),
    workExp:[{}],
    project:[{}],
    education:[{}],
    achievements:[],
    summary:"",
    other:"",

  })
  console.log(values)
  // useEffect(()=>{
  //   try{
  //     axios.get("http://localhost:8000/fetchdata")
  //     .then(response=>{
  //        console.log("response+"+JSON.stringify(response.data));
  //       //   console.log("response+"+JSON.stringify(response.data.basicInfoDetail.detail));
  //           console.log("response+"+JSON.stringify(response.data.workExpDetails.details[0]));
  //           console.log("response+"+JSON.stringify(response.data.workExpDetails.details[1]));
  //       //     let workExpDetails=response.data.workExpDetails.details[0];
  //       //     setValues(response.data.basicInfoDetail.detail);
  //       //     console.log(values);
  //       //     setValues((prev)=>({...prev,workExpDetails}))
            
  //       let workExpDetails=[response.data.workExpDetails.details]
  //           setValues((prev)=>({...prev,workExp:workExpDetails[0]}));
  //           console.log(values.workExp);

  //          console.log("values "+JSON.stringify(values))
  //         // setValues(response.data)    
  //     })
  //   }catch(err){
  //     console.log(err);
  //   }
  // },[])


  const handleClick=()=>{
    console.log(information)
    console.log(values)
    switch(sections[activeKey]){
      case sections.basicInfo:
        props.setInformation((prev)=>({
          ...prev,
          [sections.basicInfo]:
          {...prev[sections.basicInfo],
            detail:values.basicInfo,
            sectionTitle:sectionTitle,
          }
        }))
        break
      case sections.workExp:
        props.setInformation(prev=>({
          ...prev,
          [sections.workExp]:{
            ...prev[sections.workExp],
            details:values.workExp,
            sectionTitle,
          }
        }))
      break; 
      case sections.project:
       props.setInformation(prev=>({
        ...prev,
        [sections.project]:{
          ...prev[sections.project],
          details:values.project,
          sectionTitle
        }
             
       }))   
       break
       case sections.education:
       props.setInformation(prev=>({
        ...prev,
        [sections.education]:{
          ...prev[sections.education],
          details:values.education,
          sectionTitle
        }
             
       }))   
       break
       case sections.summary:
        props.setInformation(prev=>({
         ...prev,
         [sections.summary]:{
           ...prev[sections.summary],
           detail:values.summary,
           sectionTitle
         }
       }))
       break
       case sections.other:
       props.setInformation(prev=>({
        ...prev,
        [sections.other]:{
          ...prev[sections.education],
          detail:values.other,
          sectionTitle
        }
      }))
      break


    }
    console.log(information)
  }

// const handleOnChange=(fieldName,event)=>{
//   console.log(event.target.value)
//   console.log(values);
//   console.log(fieldName)
//   let tempValues=values
//   let tempDetails=tempValues[activeKey]
//  tempDetails[activeDetailIndex][fieldName]=event.target.value
//  console.log(tempValues);
//   setValues(tempValues)
//   console.log(values);

// }

  const workExp = (
    <div className={Styles.details}>
      <div className={Styles.row}>
        <InputControl
          label="Company Name"
          placeholder="Enter company name"
             value={values.workExp[activeDetailIndex]?.companyName ? values.workExp[activeDetailIndex].companyName : ""}
            // value={values.workExp[activeDetailIndex]?.companyName ? values.workExp[activeDetailIndex].companyName : ""}
            onChange={(event) =>
              {
                let tempDetails=values.workExp?values.workExp:[]
                tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],companyName:event.target.value}
               
               setValues((prev) => ({
                 ...prev,
                 workExp:tempDetails        
               }))
              
              }
            }
        />
        <InputControl
          label="Title"
          placeholder="Enter job position eg:Frontend Developer"
             value={values.workExp[activeDetailIndex]?.title ? values.workExp[activeDetailIndex].title : ""}
            onChange={(event) =>
              {
                let tempDetails=values.workExp?values.workExp:[]
                tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],title:event.target.value}
               
               setValues((prev) => ({
                 ...prev,
                 workExp:tempDetails        
               }))
              
              }
            }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Certification Link"
          placeholder="Enter certificate link"
             value={values.workExp[activeDetailIndex]?.certificationLink?values.workExp?.certificationLink:""}
            onChange={(event) =>
              {
              let  tempDetails=values.workExp?values.workExp:[]
                tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],certificationLink:event.target.value}
               
               setValues((prev) => ({
                 ...prev,
                 workExp:tempDetails        
               }))
              
              }
           }
        />

        {/* <div className={Styles.row}> */}
        <InputControl
          label="Location"
          placeholder="Enter work location (eg:remote)"
           value={values.workExp[activeDetailIndex]?.location?values.workExp?.location:""}
          onChange={(event) =>
            {
            let tempDetails=values.workExp?values.workExp:[]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],location:event.target.value}
             
             setValues((prev) => ({
               ...prev,
               workExp:tempDetails        
             }))
            
            }
          }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Start Date"
          type="date"
          placeholder="Enter starting date"
           value={values.workExp[activeDetailIndex]?.startDate?values.workExp?.startDate:""}
          onChange={(event) =>
            {
             let tempDetails=values.workExp?values.workExp:[]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],startDate:event.target.value}
             
             setValues((prev) => ({
               ...prev,
               workExp:tempDetails        
             }))
            
            }
          }
        />
        <InputControl
          label="End date"
          type="date"
          placeholder="Enter End date"
           value={values.workExp[activeDetailIndex]?.endDate?values.workExp?.endDate:""}
          onChange={(event) =>
            {
             let tempDetails=values.workExp?values.workExp:[]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],endDate:event.target.value}
             
             setValues((prev) => ({
               ...prev,
               workExp:tempDetails        
             }))
            
            }
          }
        />
      </div>
    </div>
  );
  const basicInfo = (
    <div className={Styles.details}>
      {/* <img src="photo" alt=""/> */}
      <input type="file" />
      {/* onChange={(event)=>setValues((prev)=>({...prev,photo:event.target.files[0]}))}/> */}
      <div className={Styles.row}>
        <InputControl
          label="First Name"
          placeholder="Enter First Name"
             value={values.basicInfo?.firstName?values.basicInfo?.firstName : ""}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, basicInfo:{...prev.basicInfo,firstName: event.target.value }}))
            }
        />
        <InputControl
          label="Last Name"
          placeholder="Enter last Name"
          value={values.basicInfo?.lastName ? values.basicInfo?.lastName : ""}
          onChange={(event) =>
              setValues((prev) => ({ ...prev,basicInfo:{...prev.basicInfo,lastName: event.target.value }}))
            }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Mobile number"
          type="number"
          placeholder="Enter phone number"
          value={values.basicInfo?.phone?values.basicInfo?.phone:""}
            onChange={(event) =>
              setValues((prev) => ({ ...prev,basicInfo:{...prev.basicInfo,phone: event.target.value }}))
            }
        />
        <InputControl
          label="Mail ID"
          type="email"
          placeholder="Enter your mailid"
           value={values.basicInfo?.email ? values.basicInfo?.email:""}
            onChange={(event) =>
              setValues((prev) => ({ ...prev,basicInfo:{...prev.basicInfo, email: event.target.value }}))
            }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Linkedin Link"
          placeholder="Enter your Linkedin link"
             value={values.basicInfo?.linkedIn?values.basicInfo?.linkedIn:""}
            onChange={(event) =>
              setValues((prev) => ({ ...prev,basicInfo:{...prev.basicInfo,linkedIn: event.target.value }}))
            }
        />
        <InputControl
          label="Github Link"
          placeholder="Enter your Github Link"
             value={values.basicInfo?.github?values.basicInfo?.github:""}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, basicInfo:{...prev.basicInfo,github: event.target.value }}))
            }
        />
      </div>
    </div>
  );
  const project = (
    <div className={Styles.details}>
      <div className={Styles.row}>
        <InputControl
          label="Project title"
          placeholder="Enter the title of the project"
            value={values.project[activeDetailIndex]?.projectName?values.project[activeDetailIndex].projectName:""}
            onChange={(event) =>{
              let tempDetails=values.project?values.project:[]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],projectName:event.target.value}    
             setValues((prev) => ({
               ...prev,
               project:tempDetails        
             }))
            }}
        />
        <InputControl
          label="Overview"
          placeholder="Enter basic overviweof the project"
            value={values.project[activeDetailIndex]?.overview?values.project[activeDetailIndex].overview:""}
            // value={values.project[activeDetailIndex]?.projectName?values.project[activeDetailIndex].projectName:""}
            onChange={(event) =>
              {
                let tempDetails=values.project?values.project:[]
                tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],overview:event.target.value}    
               setValues((prev) => ({
                 ...prev,
                 project:tempDetails        
               }))
              }
            }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Deployed Link"
          placeholder="Enter the deployed link of the project"
            value={values.project[activeDetailIndex]?.deployedLink?values.project[activeDetailIndex].deployedLink:""}
            onChange={(event) =>
              {
                let tempDetails=values.project?values.project:[]
                tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],deployedLink:event.target.value}    
               setValues((prev) => ({
                 ...prev,
                 project:tempDetails        
               }))
              }
            }
        />
        <InputControl
          label="Github Link"
          placeholder="Enter github link"
            value={values.project[activeDetailIndex]?.github?values.project[activeDetailIndex].github:""}
            onChange={(event) =>
              {
                let tempDetails=values.project?values.project:[{}]
                tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],github:event.target.value}    
               setValues((prev) => ({
                 ...prev,
                 project:tempDetails        
               }))
              }
            }
        />
      </div>
    </div>
  );
  const education = (
    <div className={Styles.details}>
      <div className={Styles.row}>
        <InputControl
          label="Institute name"
          placeholder="Enter school/college name"
          value={values.education[activeDetailIndex]?.instituteName ? values.education[activeDetailIndex]?.instituteName : ""}
          onChange={(event) =>
            {
              let tempDetails=values.education?values.education:[{}]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],instituteName:event.target.value}    
             setValues((prev) => ({
               ...prev,
               education:tempDetails        
             }))
            }
          }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Degree"
          placeholder="Enter Degree like BTech."
          value={values.education[activeDetailIndex]?.degree ? values.education[activeDetailIndex]?.degree : ""}
          onChange={(event) =>
            {
              let tempDetails=values.education?values.education:[{}]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],degree:event.target.value}    
             setValues((prev) => ({
               ...prev,
               education:tempDetails        
             }))
            }
          }
        />
        <InputControl
          label="Marks"
          type="number"
          onWheel={(e) => e.target.blur()}
          placeholder="Enter marks in percentage of cgpa"
          value={values.education[activeDetailIndex]?.marks?values.education[activeDetailIndex]?.marks:""}
          onChange={(event) =>
            {
              let tempDetails=values.education?values.education:[{}]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],marks:event.target.value}    
             setValues((prev) => ({
               ...prev,
               education:tempDetails        
             }))
            }
          }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Start date"
          type="date"
          placeholder="Enter start date"
          value={values.education[activeDetailIndex]?.startDate ? values.education[activeDetailIndex]?.startDate : ""}
          onChange={(event) =>
            {
              let tempDetails=values.education?values.education:[{}]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],startDate:event.target.value}    
             setValues((prev) => ({
               ...prev,
               education:tempDetails        
             }))
            }
          }
        />
        <InputControl
          label="End date"
          type="date"
          placeholder="Enter End date"
          value={values.education[activeDetailIndex]?.endDate ? values.education[activeDetailIndex]?.endDate : ""}
          onChange={(event) =>
            {
              let tempDetails=values.education?values.education:[{}]
              tempDetails[activeDetailIndex]={...tempDetails[activeDetailIndex],endDate:event.target.value}    
             setValues((prev) => ({
               ...prev,
               education:tempDetails        
             }))
            }
          }
        />
      </div>
    </div>
  );
  const achievements = (
    <div className={Styles.details}>
      <div className={Styles.column}>
        <label>List your achievements</label>
        <InputControl
          placeholder="Line 1"
            // value={values.achievement?.points ? values.achievement?.points[0] : ""}
          //   onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl
          placeholder="Line 2"
          //   value={values.points ? values.points[1] : ""}
          //   onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
        <InputControl
          placeholder="Line 3"
          //   value={values.points ? values.points[2] : ""}
          //   onChange={(event) => handlePointUpdate(event.target.value, 2)}
        />
      </div>
    </div>
  );
  const summary = (
    <div className={Styles.details}>
      <InputControl
        label="Summary"
        placeholder="Enter your objective"
        value={values.summary?values.summary:""}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, summary: event.target.value }))
        }
      />
    </div>
  );
  const other = (
    <div className={Styles.details}>
      <InputControl
        label="Other"
        placeholder="Enter Something"
        value={values.other?values.other:""}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, other:event.target.value }))
        }
      />
    </div>
  );
  const generateBody = () => {
    switch (sections[activeKey]) {
      case sections.basicInfo:
        return basicInfo;
      case sections.workExp:
        return workExp;
      case sections.project:
        return project;
      case sections.education:
        return education;
      case sections.achievements:
        return achievements;
      case sections.summary:
        return summary;
      case sections.other:
        return other;
      default:
        return "";
    }
  };
  const handleAddNew=()=>{

  console.log(values[activeKey])
  // console.log(Object.keys(values[activeKey][activeDetailIndex]))
  if(!values[activeKey][activeDetailIndex]){
    return;
  }
  // let tempValues=values
  // tempValues[activeKey]=[...tempValues[activeKey],{}]
  //   setValues(tempValues);
    setActiveDetailIndex(values[activeKey].length);
  }
  useEffect(()=>{
    setSectionTitle(sections[activeKey])
    setActiveDetailIndex(0);
  },[activeKey])

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
       {Object.keys(sections)?.map((key) => (  //object.keys(sections) will give an array of keys of section object, on which we are mapping
          <div

            className={`${Styles.sections} ${
              activeKey === key ? Styles.active : ""
            }`}
            key={key}
            onClick={() => setactiveKey(key)}
          >
            {sections[key]}     
          </div>
        ))}
      </div>
      <div className={Styles.body}>
      <InputControl
          label="Title"
          placeholder="Enter section title"
          value={sectionTitle}
          onChange={(event) => setSectionTitle(event.target.value)}
         
        />
         <div className={Styles.chips}>
        {information[sections[activeKey]].details?.map((item,index)=>(
          <div className={Styles.chip} onClick={()=>setActiveDetailIndex(index)}>
             {sections[activeKey]}{index+1}
            </div>
        ))}
        {information[sections[activeKey]].details?
          <div className={Styles.new} onClick={handleAddNew} >
              +New
            </div>
            : ""}
           </div> 
      {generateBody()}
      </div>
      <div className={Styles.Button}>
        <button onClick={handleClick} >Save</button>
      </div>
    </div>
  );
}
