
import React, { useEffect, useState } from "react";
import { X } from "react-feather";
import Styles from "./Editor.module.css";
import {InputControl} from "./InputControl";
import axios from "axios";

export default function Editor(props) {
  
  let sections = props.sections;
  let information = props.resumeInfo;
  console.log(Object.keys(sections));
  // console.log(information) //printing the whole resume info with given details.
  const [activeKey, setactiveKey] = useState(Object.keys(sections)[0]);
  const [activeInformation, setActiveInformation] = useState(
    information[sections[Object.keys(sections)[0]]]
  );

  const [activeDetailIndex, setActiveDetailIndex] = useState(0);
  const [sectionTitle, setSectionTitle] = useState(sections[Object.keys(sections)[0]]);
  const [values, setValues] = useState({
    photo:activeInformation?.detail?.photo||"",
              firstName: activeInformation?.detail?.firstName || "",
              lastName: activeInformation?.detail?.lastName || "",
              linkedIn: activeInformation?.detail?.linkedIn || "",
              github: activeInformation?.detail?.github || "",
               phone: activeInformation?.detail?.phone || "",
               email: activeInformation?.detail?.email || "",
  });

  const handlePointUpdate = (value, index) => {
     const tempValues = { ...values };
    if (!Array.isArray(tempValues.points)) tempValues.points = [];
    tempValues.points[index] = value;
    setValues(tempValues);

  };
  

  useEffect(()=>{
    try{
      axios.get("http://localhost:8000/fetchdata")
      .then(response=>{
  //       props.setInformation(response.data)
         console.log("response+"+JSON.stringify(response.data));
          console.log("response+"+JSON.stringify(response.data.basicInfoDetail.detail));
          console.log("response+"+JSON.stringify(response.data.workExpDetails.details[0]));
            let workExpDetails=response.data.workExpDetails.details[0];
            setValues(response.data.basicInfoDetail.detail);
            console.log(values);
            setValues((prev)=>({...prev,workExpDetails}))
            console.log(values);

            // setValues({...email,response.data.basicInfoDetail.detail});

          // console.log("values "+JSON.stringify(values))
          // setValues(response.data)    
      })
    }catch(err){
      console.log(err);
    }
  },[])
      console.log(values);
  const workExp = (
    <div className={Styles.details}>
      <div className={Styles.row}>
        <InputControl
          label="Company Name"
          placeholder="Enter company name"
          value={values.companyName ? values.companyName : ""}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              companyName: event.target.value,
            }))
          }
        />
        <InputControl
          label="Title"
          placeholder="Enter job position eg:Frontend Developer"
          value={values.title ? values.title : ""}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              title: event.target.value,
            }))
          }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Certification Link"
          placeholder="Enter certificate link"
          value={values.certificationLink?values.certificationLink:""}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              certificationLink: event.target.value,
            }))
          }
        />
     
      {/* <div className={Styles.row}> */}
      <InputControl
        label="Location"
        placeholder="Enter work location (eg:remote)"
        value={values.location?values.location:""}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, location: event.target.value }))
        }
      />
      </div>
      <div className={Styles.row}>
      <InputControl
        label="Start Date"
        type="date"
        placeholder="Enter starting date"
        value={values.startDate?values.startDate:""}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, startDate: event.target.value }))
        }
      />
      <InputControl
        label="End date"
        type="date"
        placeholder="Enter End date"
        value={values.endDate?values.endDate:""}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, endDate: event.target.value }))
        }
      />
    </div>
    </div>
  );
 
  const basicInfo = (
    <div className={Styles.details}>
      {/* <img src="photo" alt=""/> */}
      <input type="file"
        onChange={(event)=>
          setValues((prev)=>({...prev,photo:event.target.files[0]}))}/>
      <div className={Styles.row}>
        <InputControl
          label="First Name"
          placeholder="Enter First Name"
          value={values.firstName ? values.firstName : ""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, firstName: event.target.value }))
          }
        />
        <InputControl
          label="Last Name"
          placeholder="Enter last Name"
          value={values.lastName ? values.lastName : ""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, lastName: event.target.value }))
          }
        />
     </div>
         <div className={Styles.row}> 
        <InputControl
          label="Mobile number"
          type="number"
          placeholder="Enter phone number"
          value={values.phone?values.phone:""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, phone: event.target.value }))
          }
        />
        <InputControl
          label="Mail ID"
          type="email"
          placeholder="Enter your mailid"
          value={values.email?values.email:""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
         </div> 
        <div className={Styles.row}>
        <InputControl
          label="Linkedin Link"
          placeholder="Enter your Linkedin link"
          value={values.linkedIn?values.linkedIn:""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, linkedIn: event.target.value }))
          }
        />
        <InputControl
          label="Github Link"
          placeholder="Enter your Github Link"
          value={values.github?values.github:""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, github: event.target.value }))
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
          value={values.projectName?values.projectName:""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, projectName: event.target.value }))
          }
        />
        <InputControl
          label="Overview"
          placeholder="Enter basic overviweof the project"
          value={values.overview?values.overview:""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, overview: event.target.value }))
          }
        />
      </div>
      <div className={Styles.row}>
        <InputControl
          label="Deployed Link"
          placeholder="Enter the deployed link of the project"
          value={values.deployedLink?values.deployedLink:""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, deployedLink: event.target.value }))
          }
        />
        <InputControl
          label="Github Link"
          placeholder="Enter github link"
          value={values.github?values.github:""}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, github: event.target.value }))
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
        value={values.instituteName ? values.instituteName : ""}
        onChange={(event) =>
          setValues((prev) => ({
            ...prev,
            instituteName: event.target.value,
          }))
        }
      />
      </div>
      <div className={Styles.row}>
      <InputControl
        label="Degree"
        placeholder="Enter Degree like BTech."
        value={values.degree ? values.degree : ""}
        onChange={(event) =>
          setValues((prev) => ({
            ...prev,
            degree: event.target.value,
          }))
        }
      />
    <InputControl
        label="Marks"
        type="number" onWheel={(e) => e.target.blur()}
        placeholder="Enter marks in percentage of cgpa"
        value={values.marks?values.marks:""}
        onChange={(event) =>
          setValues((prev) => ({
            ...prev,
            marks: event.target.value,
          }))
        }
      />
    </div>
         <div className={Styles.row}>
      <InputControl
        label="Start date"
        type="date"
        placeholder="Enter start date"
        value={values.startDate ? values.startDate : ""}
        onChange={(event) =>
          setValues((prev) => ({
            ...prev,
            startDate: event.target.value,
          }))
        }
      />
      <InputControl
        label="End date"
        type="date"
        placeholder="Enter End date"
        value={values.endDate ? values.rndDate : ""}
        onChange={(event) =>
          setValues((prev) => ({
            ...prev,
            endDate: event.target.value,
          }))
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
          value={values.points ? values.points[0] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 0)}
        />
        <InputControl
          placeholder="Line 2"
          value={values.points ? values.points[1] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 1)}
        />
        <InputControl
          placeholder="Line 3"
          value={values.points ? values.points[2] : ""}
          onChange={(event) => handlePointUpdate(event.target.value, 2)}
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
          setValues((prev) => ({ ...prev, other: event.target.value }))
        }
      />
    </div>
  );
  // console.log("adding all"+JSON.stringify(values));
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
      default :
       return "";
    }
  };

  const handleClick = () => {
    
    console.log(values);
    switch (sections[activeKey]) {
      case sections.basicInfo: {
        const tempDetail = {
          photo:values.photo,
          firstName: values.firstName,
          lastName: values.lastName,
          linkedIn: values.linkedIn,
          github: values.github,
          email: values.email,
          phone: values.phone,
        };
        props.setInformation((prev) => ({
          ...prev,
          [sections.basicInfo]: {
            ...prev[sections.basicInfo],
            detail: tempDetail,
            sectionTitle,
          }, 
        }));
        break;
      }
      case sections.workExp: {
        const tempDetail = {
          title: values.title,
          companyName: values.companyName,
          certificationLink: values.certificationLink,
          startDate: values.startDate,
          endDate: values.endDate,
          location: values.location,
        };
        const tempDetails = [...information[sections.workExp]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.workExp]: {
            ...prev[sections.workExp],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.project: {
        const tempDetail = {
          projectName: values.projectName,
          overview: values.overview,
          deployedLink: values.deployedLink,
          github: values.github,
        };
        const tempDetails = [...information[sections.project]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.project]: {
            ...prev[sections.project],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.education: {
        const tempDetail = {
          degree: values.degree,
          instituteName: values.instituteName,
          startDate: values.startDate,
          endDate: values.endDate,
          marks: values.marks,
        };
        const tempDetails = [...information[sections.education]?.details];
        tempDetails[activeDetailIndex] = tempDetail;
        props.setInformation((prev) => ({
          ...prev,
          [sections.education]: {
            ...prev[sections.education],
            details: tempDetails,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.achievements: {
        const tempPoints = values.points?values.points:[];
        props.setInformation((prev) => ({
          ...prev,
          [sections.achievements]: {
            ...prev[sections.achievements],
            points: tempPoints,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.summary: {
        const tempDetail = values.summary;
        props.setInformation((prev) => ({
          ...prev,
          [sections.summary]: {
            ...prev[sections.summary],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      case sections.other: {
        const tempDetail = values.other;
        props.setInformation((prev) => ({
          ...prev,
          [sections.other]: {
            ...prev[sections.other],
            detail: tempDetail,
            sectionTitle,
          },
        }));
        break;
      }
      default:
        return "";
    }
  };

  const hanadleAddNew = () => {
    const details = activeInformation?.details;
    console.log(details);
     if (!details) return;
    const lastDetail = details.slice(-1)[0];
    // console.log(Object.keys(lastDetail));
     if (!Object.keys(lastDetail).length) return;
    details?.push({});
    props.setInformation((prev) => ({
      ...prev,
      [sections[activeKey]]: {
        ...information[sections[activeKey]],
        details: details,
      },
    }));
    setActiveDetailIndex(details.length - 1);
  };

  const handleDeleteDetail = (index) => {
    const details = activeInformation.details
      ? [...activeInformation?.details]
      : "";
    if (!details) return;
    details.splice(index, 1);
    props.setInformation((prev) => ({
      ...prev,
      [sections[activeKey]]: {
        ...information[sections[activeKey]],
        details: details,
      },
    }));
   
    setActiveDetailIndex((prev) => (prev === index ? 0 : prev - 1));
  
  };
  useEffect(() => {
    const activeInfo = information[sections[activeKey]];
    setActiveInformation(activeInfo);
    setSectionTitle(sections[activeKey]);
    setActiveDetailIndex(0);
  }, [activeKey]);

  useEffect(() => {
    setActiveInformation(information[sections[activeKey]]);
  }, [information]);
  useEffect(() => {
    const details = activeInformation?.details;
    if (!details) {
      return;
    }
    const activeInfo = information[sections[activeKey]];
    setValues({
      title: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.title || ""
        : "",
      companyName: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.companyName || ""
        : "",
      startDate: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.startDate || ""
        : "",
      endDate: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.endDate || ""
        : "",
      location: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.location || ""
        : "",
      certificationLink: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.certificationLink || ""
        : "",
      points: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.points
          ? [...activeInfo.details[activeDetailIndex]?.points]
          : ""
        : activeInfo?.points
        ? [...activeInfo.points]
        : "",
      overview: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.overview || ""
        : "",
      deployedLink: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.deployedLink || ""
        : "",  
      degree: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.degree || ""
        : "",
      marks: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.marks || ""
        : "",
      instituteName: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.instituteName || ""
        : "",
      projectName: activeInfo?.details
        ? activeInfo?.details[activeDetailIndex]?.projectName || ""
        : "",

      // summary:typeof activeInfo?.detail!==object?activeInfo.detail:"",
      // other:typeof activeInfo?.detail!==object?activeInfo.detail:""
    });
  }, [activeDetailIndex]);

  // console.log(values);

  return (
    // <div className='border'>
    <div className={Styles.container}>
      <div className={Styles.header}>
        {Object.keys(sections)?.map((key) => (
          <div
            className={`${Styles.sections} ${
              activeKey === key ? Styles.active : ""
            }`}
            key={key}
            onClick={() => setactiveKey(key)}
          >
            {sections[key]}
           {/* { console.log(sections[key])} */}
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
        {/* <div className={Styles.photo}>
          <img src={photo} alt=""/>
        </div> */}
        <div className={Styles.chips}>
          {activeInformation?.details
            ? activeInformation?.details?.map((item, index) => (
                <div
                  className={`${Styles.chip} ${
                    activeDetailIndex === index ? Styles.active : ""
                  }`}
                  key={index}
                  onClick={() => setActiveDetailIndex(index)}
                >
                  <p>
                    {sections[activeKey]} {index + 1}
                  </p>
                  <X
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteDetail(index);
                    }}
                  />
                </div>
              ))
            : ""}
          {activeInformation?.details &&
          activeInformation?.details?.length > 0 ? (
            <div className={Styles.new} onClick={hanadleAddNew}>
              +New
            </div>
          ) : (
            ""
          )}
        </div>
        {generateBody()}
      </div>

      <div className={Styles.Button}>
        <button onClick={handleClick}>Save</button>
      </div>
    </div>
  );
}
