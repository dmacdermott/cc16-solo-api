import React, { useState, useEffect } from "react";
import "./sort.css";

function Sort({ allProjects, getProjectName, getSingleProject }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (allProjects)
      setTypes([...new Set(allProjects.map(projects => projects.type))]);
  }, [allProjects]);

  const options = types.map((type, index) => (
    <option key={index} value={type}>
      {type[0].toUpperCase() + type.slice(1)}
    </option>
  ));

  return (
    <div>
      <h3 id="sort-by-title">Sort / Search By</h3>

      <section id="sort-by-section">
        <div className="sort-col">
          <label>🕵️‍♂️ Sort projects by type:</label>
          <select
            name="types"
            className="sort-by-select"
            id="sort-by-select-type"
          >
            <option
              key={"hidden-option"}
              disabled
              hidden
              value=""
              id="hidden-option"
            ></option>
            <option key="all-option" value="all">
              All
            </option>
            {options}
          </select>
        </div>
        <div className="sort-col">
          <label>🔎 Search by name:</label>
          <input
            htmlFor="search-by-name"
            type="search"
            onChange={event => {
              getProjectName(event.target.value);
            }}
          />
          <input
            type="button"
            value="Search"
            id="search-for-name"
            onClick={() => {
              getSingleProject();
            }}
          />
        </div>
        <div className="sort-col">
          <label>👨‍💻 Add New Project:</label>
          <button type="button" value="Add Project" id="add-project-button">
            Add Project
          </button>
        </div>
      </section>
    </div>
  );
}

export default Sort;
