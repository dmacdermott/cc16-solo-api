import {
  getData,
  getAllProjectsByType,
  getAProject,
  getByRequirement,
} from "./data.js";

async function getStartingData() {
  //Load stats and starting data
  let projects = await getData();
  let basicReqTotal = 0;
  let medReqTotal = 0;
  let advReqTotal = 0;
  let nightmareTotal = 0;
  let basicReqComplete = 0;
  let medReqComplete = 0;
  let advReqComplete = 0;
  let nightmareComplete = 0;
  let todoTotal = 0;

  projects.forEach(project => {
    if (project.basic_req !== null) {
      basicReqTotal++;
      if (project.basic_req) {
        basicReqComplete++;
      }
    }
    if (project.med_req !== null) {
      medReqTotal++;
      if (project.med_req) {
        medReqComplete++;
      }
    }
    if (project.adv_req !== null) {
      advReqTotal++;
      if (project.adv_req) {
        advReqComplete++;
      }
    }
    if (project.nightmare !== null) {
      nightmareTotal++;
      if (project.nightmare) {
        nightmareComplete++;
      }
    }
    if (project.todo) {
      todoTotal++;
    }
  });
  //set html
  console.log(
    basicReqTotal,
    basicReqComplete,
    medReqTotal,
    medReqComplete,
    advReqTotal,
    advReqComplete,
    nightmareTotal,
    nightmareComplete,
    todoTotal
  );
  document.getElementById(
    "basic-req-stat"
  ).innerHTML = `${basicReqComplete} / ${basicReqTotal}`;
  document.getElementById(
    "med-req-stat"
  ).innerHTML = `${medReqComplete} / ${medReqTotal}`;
  document.getElementById(
    "adv-req-stat"
  ).innerHTML = `${advReqComplete} / ${advReqTotal}`;
  document.getElementById(
    "nightmare-stat"
  ).innerHTML = `${nightmareComplete} / ${nightmareTotal}`;
  document.getElementById("to-do-stat").innerHTML = `${todoTotal}`;

  loadProjects(projects);
}
const projectArea = document.getElementById("project-area");

const loadProjects = function (data) {
  data.forEach(data => {
    let projectCard = document.createElement("section");
    projectCard.classList.add("project-card");
    projectArea.appendChild(projectCard);
    projectCard.innerHTML = `
    <div class="edit-wrapper"><a href="#"> <svg class="edit-icon" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
  </svg></a></div>
      <div class="project-header">
        <h1><a href="${data.link}" target="_blank">${data.projectName}</a></h1>
        <h5>${data.type}</h5>
        
      </div>
      <div class="progress-wrapper">
        <div class="req">
          <h4>BASIC</h4>
          <div class="status" id="basic-status">${data.basic_req}</div>
        </div>
        <div class="req">
          <h4>MEDIUM</h4>
          <div class="status" id="med-status">${data.med_req}</div>
        </div>
        <div class="req">
          <h4>ADVANCED</h4>
          <div class="status" id="adv-status">${data.adv_req}</div>
        </div>
        <div class="req">
          <h4>NIGHTMARE</h4>
          <div class="status" id="nightmare-status">${data.nightmare}</div>
        </div>
      </div>
      `;
  });
};

// Sort by type select
const selector = document.getElementById("sort-by-select-type");
selector.addEventListener("change", async event => {
  let type = event.target.value;
  if (type === "all") {
    projectArea.innerHTML = "";
    return getStartingData();
  }
  let typeProjects = await getAllProjectsByType(type);
  projectArea.innerHTML = "";
  loadProjects(typeProjects);
});

// Search by name or id
const searchButton = document.getElementById("search-for-project");
searchButton.addEventListener("click", async () => {
  let name = document.getElementById("search-by-name").value;

  let projectByName = await getAProject(name);
  console.log(projectByName);
  projectArea.innerHTML = "";
  loadProjects([projectByName]);
});

// Sort by unfinished requirements
const reqSelector = document.getElementById("sort-by-select-req");
reqSelector.addEventListener("change", async event => {
  let req = event.target.value;
  if (req === "all") {
    projectArea.innerHTML = "";
    return getStartingData();
  }
  let reqProjects = await getByRequirement(req);
  projectArea.innerHTML = "";
  loadProjects(reqProjects);
});
getStartingData();
