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
  // console.log(information[sections.workExp]?.details)

  const[sectionTitle,setSectionTitle]=useState(sections[Object.keys(sections)[0]]);
  const [activeKey, setactiveKey] = useState(Object.keys(sections)[0]);
  const[activeDetailIndex,setActiveDetailIndex]=useState(0)
  const [values,setValues]=useState({
    basicInfo:information[sections.basicInfo]?.detail?{...information[sections.basicInfo].detail}:{},
    workExp:[{}],
    project:[{}],
    education:[{}],
    achievements:[],
    summary:"",
    other:"",

  })
  // console.log(values)
  // console.log(information)
  useEffect(()=>{
    try{
      axios.get("http://localhost:8000/fetchdata")
      .then(response=>{
        //  console.log("response+"+JSON.stringify(response.data));
        //   console.log("response+"+JSON.stringify(response.data.basicInfoDetail.detail));
        // console.log("response+"+JSON.stringify(response.data.workExpDetails.details[0]));
        // console.log("response+"+JSON.stringify(response.data.workExpDetails.details[1]));
        //     let workExpDetails=response.data.workExpDetails.details[0];
        //     setValues(response.data.basicInfoDetail.detail);
        //     console.log(values);
        //     setValues((prev)=>({...prev,workExpDetails}))
            
        let workExpDetails=response.data.workExpDetails;
        let basicInfoDetail=response.data.basicInfoDetail;
        let projectDetails=response.data.projectDetails;
        let educationDetails=response.data.educationDetails;
        let achievementDetails=response.data.achievementDetails;
        let summayDetails=response.data.summayDetails;
        let otherDetails=response.data.otherDetails

             console.log(workExpDetails)

            setValues((prev)=>({...prev,workExp:[...workExpDetails.details],basicInfo:{...basicInfoDetail.detail},project:[...projectDetails.details],education:[...educationDetails.details],other:otherDetails.detail,summary:summayDetails.detail,achievements:[...achievementDetails.points]}));
            props.setInformation(prev=>({
              ...prev,
              [sections.workExp]:{
                ...prev[sections.workExp],
                details:[...workExpDetails.details],
                sectionTitle:workExpDetails.sectionTitle
               
                
                
              },
              [sections.basicInfo]:{
                ...prev[sections.basicInfo],
                detail:{...basicInfoDetail.detail},
                sectionTitle:basicInfoDetail.sectionTitle
                
              },
              [sections.project]:{
                ...prev[sections.project],
                details:[...projectDetails.details],
                sectionTitle:projectDetails.sectionTitle
                
                
              },
              [sections.education]:{
                ...prev[sections.education],
                details:[...educationDetails.details],
                sectionTitle:educationDetails.sectionTitle
              
                
              },
              [sections.achievements]:{
                ...prev[sections.achievements],
                points:[...achievementDetails.points],
                sectionTitle:achievementDetails.sectionTitle
                
              },
              [sections.summary]:{
                ...prev[sections.summary],
                detail:summayDetails.detail,
                sectionTitle:summayDetails.sectionTitle
                
              },
              [sections.other]:{
                  ...prev[sections.other],
                  detail:otherDetails.detail,
                  sectionTitle:otherDetails.sectionTitle
                  
                  
              }
              
            }))
          //   console.log(values.project[activeDetailIndex])
          //   console.log(values.workExp);
          //   console.log(information)
          //   console.log(JSON.stringify(information))

          //  console.log("values "+JSON.stringify(values))
          // setValues(response.data)    
      })
    }catch(err){
      console.log(err);
    }
  },[])


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
            sectionTitle,
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
       case sections.achievements:
       let tempDetails=[...values.achievements];
       console.log(tempDetails)
       tempDetails=tempDetails.filter((point)=>point!="")
       console.log(tempDetails)
        props.setInformation(prev=>({
         ...prev,
         [sections.achievements]:{
           ...prev[sections.achievements],
           points:[...tempDetails],
           sectionTitle
         }
       }))
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
          ...prev[sections.other],
          detail:values.other,
          sectionTitle
        }
      }))
      break


    }
    console.log(values.project[activeDetailIndex])
  }


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
             value={values.workExp[activeDetailIndex]?.certificationLink?values.workExp[activeDetailIndex].certificationLink:""}
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
           value={values.workExp[activeDetailIndex]?.location?values.workExp[activeDetailIndex]?.location:""}
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
           value={values.workExp[activeDetailIndex]?.startDate?values.workExp[activeDetailIndex]?.startDate:""}
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
           value={values.workExp[activeDetailIndex]?.endDate?values.workExp[activeDetailIndex]?.endDate:""}
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
            value={values.achievements?.[0]? values.achievements[0] : ""}
            onChange={(event) => {
              let tempDetails=values.achievements?values.achievements:[]
              tempDetails[0]=event.target.value;
              setValues(prev=>({
                ...prev,
                achievements:[...tempDetails]
              }))
            }

            }
        />
        <InputControl
          placeholder="Line 2"
          value={values.achievements?.[1]? values.achievements[1] : ""}
          onChange={(event) => {
            let tempDetails=values.achievements?values.achievements:[]
            tempDetails[1]=event.target.value;
            setValues(prev=>({
              ...prev,
              achievements:[...tempDetails]
            }))
          }
        }
        />
        <InputControl
          placeholder="Line 3"
          value={values.achievements?.[2]? values.achievements[2] : ""}
          onChange={(event) => {
            let tempDetails=values.achievements?values.achievements:[]
            tempDetails[2]=event.target.value;
          
            setValues(prev=>({
              ...prev,
              achievements:[...tempDetails]
            }))
          }
        }
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

  const handlePointUpdate = (value, index) => {
    console.log(value);
    const tempValues=values.achievements ;
    console.log(tempValues)
    tempValues[index]=[... tempValues[index],value]
    console.log(tempValues)
  //  if (!Array.isArray(tempValues.points)) tempValues.points = [];
  //  tempValues.achievements.points[index] = value;
  //  setValues(tempValues);

 };
  const handleAddNew=()=>{
  // console.log(values[activeKey])
  if(!values[activeKey][activeDetailIndex]){
    return;
  }
    setActiveDetailIndex(values[activeKey].length);
  }
  const handleDeleteDetail=(index)=>{
    const tempdetails=values[activeKey];
    tempdetails.splice(index, 1);
    console.log(index);
    // props.setInformation(prev=>({
    //   ...prev,
    //   [sections[activeKey]]:{

    //     ... [information[sections[activeKey]]],
    //     details:tempdetails
    //   }
    // }))
    handleClick();
    setActiveDetailIndex(0);
    console.log(values[activeKey])
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
          <div className={`${Styles.chip} ${activeDetailIndex===index? Styles.active:""}` } onClick={()=>setActiveDetailIndex(index)} key={index}>
             {sections[activeKey]}{index+1}
             <X
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteDetail(index);
                    }}
                  />
            </div>
        ))}
        {information[sections[activeKey]].details && information[sections[activeKey]].details.length>0?
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
