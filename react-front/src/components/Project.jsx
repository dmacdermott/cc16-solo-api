import React from "react";

const Project = ({ project }) => {
  return (
    <div className="project-wrapper" key={project.id}>
      <div className="edit-wrapper">
        <a href="#" value="" className="edit-link">
          {" "}
          <svg
            className="edit-icon"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-pencil-square"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </a>
      </div>
      <div className="project-header">
        <h1>
          {project.projectName}
          <a href={project.link} target="_blank" className="project-name">
            <span className="todo">{project.todo}</span>
          </a>
        </h1>
        <h5></h5>
      </div>
      <div className="progress-wrapper">
        <div className="req">
          <h4>BASIC</h4>
          <div className="status basic-status">{project.basic_req}</div>
        </div>
        <div className="req">
          <h4>MEDIUM</h4>
          <div className="status med-status">{project.med_req}</div>
        </div>
        <div className="req">
          <h4>ADVANCED</h4>
          <div className="status adv-status">{project.adv_req}</div>
        </div>
        <div className="req">
          <h4>NIGHTMARE</h4>
          <div className="status nightmare-status"> {project.nightmare}</div>
        </div>
      </div>
    </div>
  );
};

export default Project;
