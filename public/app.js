import { getData, getAllProjectsByType } from "./data.js";

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
      <div class="project-header">
        <h1>${data.projectName}</h1>
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
getStartingData();

// Sort by type select
const selector = document.getElementById("sort-by-select");
selector.addEventListener("change", async event => {
  let type = event.target.value;
  let typeProjects = await getAllProjectsByType(type);
  projectArea.innerHTML = "";
  loadProjects(typeProjects);
});
