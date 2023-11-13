import React, { useEffect, useState, useRef, forwardRef } from "react";
import Styles from "./Resume.module.css";
import {
  Linkedin,
  AtSign,
  GitHub,
  Phone,
  Calendar,
  Paperclip,
  MapPin,
} from "react-feather";
import photo from "../assets/photo.jpg";

const Resume = forwardRef((props, ref) => {
  // console.log(ref);
  const information = props.information;
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");
  const sections = props.sections;
  const containerRef = useRef();
  const [columns, setColumns] = useState([[], []]);
  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    basicInfo: information[sections.basicInfo],
    achievements: information[sections.achievements],
    education: information[sections.education],
    summary: information[sections.summary],
    other: information[sections.other],
  };
  console.log(info);
  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    return `${date.getDate()}/${
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + date.getMonth() + 1
    }
    /${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workExp"}
        draggable
        onDragOver={() => seTarget(info.workExp.id)}
        onDragEnd={() => setSource(info.workExp.id)}
        className={`${Styles.section} ${
          info.workExp?.sectionTitle ? "" : Styles.hidden
        }`}
      >
        <div className={Styles.sectionTitle}>{info.workExp.sectionTitle}</div>
        <div className={Styles.content}>
          {info.workExp.details.map((item, index) => (
            <div className={Styles.item} key={index}>
              {item.title && <p className={Styles.title}>{item.title}</p>}
              {item.companyName && (
                <p className={Styles.subTitle}>{item.companyName}</p>
              )}
              {item.certificationLink && (
                <a className={Styles.link} href={item.certificationLink}>
                  <Paperclip />
                  {item.certificationLink}
                </a>
              )}
              {item.startDate && item.endDate ? (
                <div className={Styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                " "
              )}
              {item.location && (
                <div className={Styles.location}>
                  <MapPin />{item.location}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => seTarget(info.project.id)}
        onDragEnd={() => setSource(info.project.id)}
        className={`${Styles.section} ${
          info.project?.sectionTitle ? "" : Styles.hidden
        }`}
      >
        <div className={Styles.sectionTitle}>{info.project.sectionTitle}</div>
        <div className={Styles.content}>
          {info.project.details.map((item) => (
            <div className={Styles.item} key={item.projectName}>
              {item.projectName && (
                <div className={Styles.title}>{item.projectName}</div>
              )}
              {item.overview && (
                <div className={Styles.overview}>{item.overview}</div>
              )}
              {item.deployedLink && (
                <a className={Styles.link} href={item.deployedLink}>
                  {" "}
                  <Paperclip />
                  {item.deployedLink}
                </a>
              )}
              {item.github && (
                <a className={Styles.link} href={item.github}>
                  {" "}
                  <GitHub /> {item.github}{" "}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education.id)}
        onDragEnd={() => setSource(info.education.id)}
        className={`${Styles.section} ${
          info.education?.sectionTitle ? "" : Styles.hidden
        }`}
      >
        <div className={Styles.sectionTitle}>{info.education.sectionTitle}</div>
        <div className={Styles.content}>
          {info.education?.details?.map((item) => (
            <div className={Styles.item}>
              {item.degree ? (
                <p className={Styles.degree}>{item.degree}</p>
              ) : (
                <span />
              )}
              {item.instituteName ? (
                <span className={Styles.instituteName}>
                  {item.instituteName} [{item.marks} %]
                </span>
              ) : (
                <span />
              )}

              {item.startDate && item.endDate ? (
                <div className={Styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.achievements]: (
      <div
        key={"achievements"}
        draggable
        onDragOver={() => seTarget(info.achievements.id)}
        onDragEnd={() => setSource(info.achievements.id)}
        className={`${Styles.section} ${
          info.achievements?.sectionTitle ? "" : Styles.hidden
        }`}
        // className={`${Styles.section} ${info.summary?.sectionTitle ? "" : Styles.hidden}`}>
      >
        <div className={Styles.sectionTitle}>
          {info.achievements?.sectionTitle}
        </div>
        <div className={Styles.content}>
          <ul className={Styles.numberd}>
            {info.achievements.points.map((elem, index) => (
              <li className={Styles.points} key={index}>
                {/* {console.log(index)} */}
                {elem}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => seTarget(info.summary.id)}
        onDragEnd={() => setSource(info.summary.id)}
        className={`${Styles.section} ${
          info.summary?.sectionTitle ? "" : Styles.hidden
        }`}
      >
        <div className={Styles.sectionTitle}>{info.summary?.sectionTitle}</div>
        <div className={Styles.content}>
          <p className={Styles.overview}>{info.summary?.detail}</p>
        </div>
      </div>
    ),
    [sections.other]: (
      <div
        key={"others"}
        draggable
        onDragOver={() => seTarget(info.other.id)}
        onDragEnd={() => setSource(info.other.id)}
        className={`${Styles.section} ${
          info.other.sectionTitle ? "" : Styles.hidden
        }`}
      >
        <div className={Styles.sectionTitle}>{info.other?.sectionTitle}</div>
        <div className={Styles.content}>
          <p className={Styles.overview}>{info?.other?.detail}</p>
        </div>
      </div>
    ),
  };
  const swapSourceTarget = (source, target) => {
    // console.log(source, target);
    if (!source || !target) return;
    const tempCol = [[...columns[0]], [...columns[1]]];
    let sourceRowIndex = tempCol[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempCol[1].findIndex((item) => item === source);
    }
    let targetRowIndex = tempCol[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempCol[1].findIndex((item) => item === target);
    }

    const tempSource = tempCol[sourceColumnIndex][sourceRowIndex];
    // console.log(tempSource);
    console.log(tempCol[targetColumnIndex][targetRowIndex]);
    tempCol[sourceColumnIndex][sourceRowIndex] =
      tempCol[targetColumnIndex][targetRowIndex];
    tempCol[targetColumnIndex][targetRowIndex] = tempSource;
    // console.log(tempCol);
    setColumns(tempCol);
  };
  useEffect(() => {
    setColumns([
      [sections.project, sections.education, sections.summary],
      [sections.workExp, sections.achievements, sections.other],
    ]);
  }, []);
  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);
  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;
    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  // console.log(info.basicInfo.detail.firstName);
  // console.log(photo);

  return (
    <div ref={ref}>
      <div ref={containerRef} className={Styles.container}>
        <div className={Styles.header}>
          <div className={Styles.photo}>
            <img
              src={
                info.basicInfo.detail.photo
                  ? URL.createObjectURL(info.basicInfo.detail.photo)
                  : photo
              }
              alt="photo"
            />
          </div>
          <div className={Styles.headInfo}>
            <p className={Styles.heading}>
              {info.basicInfo.detail.firstName
                ? info.basicInfo.detail.firstName
                : ""}{" "}
              {info.basicInfo.detail.lastName}
            </p>
            <div className={Styles.links}>
              <a className={Styles.link}>
                <AtSign />
                {info.basicInfo.detail.email}
              </a>
              <a className={Styles.link}>
                <Phone />
                {info.basicInfo.detail.phone}
              </a>
              <a className={Styles.link}>
                <Linkedin />
                {info.basicInfo.detail.linkedIn}
              </a>
              <a className={Styles.link}>
                <GitHub />
                {info.basicInfo.detail.github}
              </a>
            </div>
          </div>
        </div>
        <div className={Styles.main}>
          <div className={Styles.col1}>
            {columns[0].map((item) => sectionDiv[item])}
          </div>
          <div className={Styles.col2}>
            {columns[1].map((item) => sectionDiv[item])}
          </div>
        </div>
      </div>
    </div>
  );
});
export default Resume;
