import {
  getData,
  getAllProjectsByType,
  getAProject,
  getByRequirement,
  insertNewProject,
  updateProject,
  deleteProject,
} from "./data.js";

//LOAD STATS AND STARTING DATA
async function getStartingData() {
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
  //SET STATS
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
  document
    .querySelectorAll(".edit-link")
    .forEach(element =>
      element.addEventListener("click", () =>
        edit(element.getAttribute("value"))
      )
    );
}

//LOAD PROJECTS
const projectArea = document.getElementById("project-area");
const loadProjects = async function (data) {
  await data.forEach(data => {
    let projectCard = document.createElement("section");
    projectCard.classList.add("project-card");
    projectArea.appendChild(projectCard);
    projectCard.innerHTML = `
    <div class="edit-wrapper"><a href="#" value="${data.projectName}" class="edit-link"> <svg class="edit-icon" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
  </svg></a></div>
      <div class="project-header">
        <h1><a href="${data.link}" target="_blank" contenteditable="false">${data.projectName}</a></h1>
        <h5 contenteditable="false">${data.type}</h5>
        
      </div>
      <div class="progress-wrapper">
        <div class="req">
          <h4>BASIC</h4>
          <div class="status" id="basic-status"contenteditable="false">${data.basic_req}</div>
        </div>
        <div class="req">
          <h4>MEDIUM</h4>
          <div class="status" id="med-status"contenteditable="false">${data.med_req}</div>
        </div>
        <div class="req">
          <h4>ADVANCED</h4>
          <div class="status" id="adv-status"contenteditable="false">${data.adv_req}</div>
        </div>
        <div class="req">
          <h4>NIGHTMARE</h4>
          <div class="status" id="nightmare-status"contenteditable="false">${data.nightmare}</div>
        </div>
      </div>
      `;
  });
};

// SORT PROJECTS BY TYPE
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
  document
    .querySelectorAll(".edit-link")
    .forEach(element =>
      element.addEventListener("click", () =>
        edit(element.getAttribute("value"))
      )
    );
});

// SEARCH PROJECT BY NAME OR ID
const searchButton = document.getElementById("search-for-project");
searchButton.addEventListener("click", async () => {
  let name = document.getElementById("search-by-name").value;

  let projectByName = await getAProject(name);
  console.log(projectByName);
  projectArea.innerHTML = "";
  loadProjects([projectByName]);
  document
    .querySelectorAll(".edit-link")
    .forEach(element =>
      element.addEventListener("click", () =>
        edit(element.getAttribute("value"))
      )
    );
});

// Sort by unfinished requirements
// REMOVED THIS FEATURE and IMPLEMENTED FEATURE ON STATS HEADING
// const reqSelector = document.getElementById("sort-by-select-req");
// reqSelector.addEventListener("change", async event => {
//   let req = event.target.value;
//   if (req === "all") {
//     projectArea.innerHTML = "";
//     return getStartingData();
//   }
//   let reqProjects = await getByRequirement(req);
//   projectArea.innerHTML = "";
//   loadProjects(reqProjects);
//   document
//     .querySelectorAll(".edit-link")
//     .forEach(element =>
//       element.addEventListener("click", () =>
//         edit(element.getAttribute("value"))
//       )
//     );
// });

// ADD NEW PROJECT TO DATABASE
const addProjectButton = document.getElementById("add-project-button");
const addSection = document.getElementById("add-section");
const addNewProject = () => {
  addSection.classList.toggle("hide-class");
};
const submitProjectButton = document.getElementById("submit-project-button");
const submitNewProject = () => {
  let projectName = document.getElementById("add-name").value;
  let type = document.getElementById("add-type").value;
  let link = document.getElementById("add-link").value;
  let basic_req = document.getElementById("add-basic").value;
  let med_req = document.getElementById("add-medium").value;
  let adv_req = document.getElementById("add-adv").value;
  let nightmare = document.getElementById("add-nightmare").value;
  let todo = document.getElementById("add-todo").value;

  let submitObj = {
    projectName: projectName || "newProject",
    type: type || "type",
    link: link || "https://github.com/dmacdermott/",
    basic_req: JSON.parse(basic_req) || true,
    med_req: JSON.parse(med_req) || null,
    adv_req: JSON.parse(adv_req) || false,
    nightmare: JSON.parse(nightmare) || null,
    todo: JSON.parse(todo) || false,
  };
  insertNewProject(submitObj);
  addSection.classList.toggle("hide-class");
  location.reload();
};
addProjectButton.addEventListener("click", () => addNewProject());
submitProjectButton.addEventListener("click", () => submitNewProject());

// GET PROJECT DETAILS WHEN CLICK EDIT BUTTON TO FILL EDIT FORM
let projectToEditOrDelete;
const editSection = document.getElementById("edit-section");

async function edit(projectName) {
  event.preventDefault();
  editSection.classList.toggle("hide-class");
  //get project data
  const data = await getAProject(projectName);
  //set global variable to use when submitting edit/deleting
  projectToEditOrDelete = data.id;

  console.log(data);
  let editLink = document.getElementById("edit-link");
  editLink.value = data.link;
  let editName = document.getElementById("edit-name");
  editName.value = data.projectName;

  let editType = document.getElementById("edit-type");
  editType.value = data.type;
  let editBasicReq = document.getElementById("edit-basic");
  editBasicReq.value = data.basic_req;
  let editMediumReq = document.getElementById("edit-medium");
  editMediumReq.value = data.med_req;
  let editAdvReq = document.getElementById("edit-adv");
  editAdvReq = data.adv_req;
  let editNightmare = document.getElementById("edit-nightmare");
  editNightmare = data.nightmare;
  let editToDo = document.getElementById("edit-todo");
  editToDo.value = data.todo;
}

//SUBMIT EDITS TO DATABASE
const submitEditButton = document.getElementById("submit-edit-button");
const submitEdits = () => {
  let projectName = document.getElementById("edit-name").value;
  let type = document.getElementById("edit-type").value;
  let link = document.getElementById("edit-link").value;
  let basic_req = document.getElementById("edit-basic").value;
  let med_req = document.getElementById("edit-medium").value;
  let adv_req = document.getElementById("edit-adv").value;
  let nightmare = document.getElementById("edit-nightmare").value;
  let todo = document.getElementById("edit-todo").value;

  let editObj = {
    projectName: projectName,
    type: type,
    link: link,
    basic_req: JSON.parse(basic_req),
    med_req: JSON.parse(med_req),
    adv_req: JSON.parse(adv_req),
    nightmare: JSON.parse(nightmare),
    todo: JSON.parse(todo),
  };
  console.log(projectToEditOrDelete, editObj);
  updateProject(projectToEditOrDelete, editObj);
  editSection.classList.toggle("hide-class");
};
submitEditButton.addEventListener("click", () => submitEdits());

//DELETE PROJECT
const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", () => {
  deleteProject(projectToEditOrDelete);
  editSection.classList.toggle("hide-class");
});

//ClOSE EDIT/DELETE POP UP
const closeEditButton = document.getElementById("close-edit-btn");
closeEditButton.addEventListener("click", () => {
  editSection.classList.toggle("hide-class");
  event.preventDefault();
});

//ClOSE ADD PROJECT POP UP
const closeAddButton = document.getElementById("close-project-btn");
closeAddButton.addEventListener("click", () => {
  addSection.classList.toggle("hide-class");
  event.preventDefault();
});

//ADD LINKS TO SORT FROM STAT

const basicStat = document.getElementById("basic-stat-underline");
const mediumStat = document.getElementById("medium-stat-underline");
const advStat = document.getElementById("advanced-stat-underline");
const nightmareStat = document.getElementById("nightmare-stat-underline");
const todoStat = document.getElementById("todo-stat-underline");

basicStat.addEventListener("click", async () => {
  let reqProjects = await getByRequirement("basic_req");
  projectArea.innerHTML = "";
  loadProjects(reqProjects);
  document
    .querySelectorAll(".edit-link")
    .forEach(element =>
      element.addEventListener("click", () =>
        edit(element.getAttribute("value"))
      )
    );
});
mediumStat.addEventListener("click", async () => {
  let reqProjects = await getByRequirement("med_req");
  projectArea.innerHTML = "";
  loadProjects(reqProjects);
  document
    .querySelectorAll(".edit-link")
    .forEach(element =>
      element.addEventListener("click", () =>
        edit(element.getAttribute("value"))
      )
    );
});
advStat.addEventListener("click", async () => {
  let reqProjects = await getByRequirement("adv_req");
  projectArea.innerHTML = "";
  loadProjects(reqProjects);
  document
    .querySelectorAll(".edit-link")
    .forEach(element =>
      element.addEventListener("click", () =>
        edit(element.getAttribute("value"))
      )
    );
});
nightmareStat.addEventListener("click", async () => {
  let reqProjects = await getByRequirement("nightmare");
  projectArea.innerHTML = "";
  loadProjects(reqProjects);
  document
    .querySelectorAll(".edit-link")
    .forEach(element =>
      element.addEventListener("click", () =>
        edit(element.getAttribute("value"))
      )
    );
});
todoStat.addEventListener("click", async () => {
  let reqProjects = await getByRequirement("todo");
  projectArea.innerHTML = "";
  loadProjects(reqProjects);
  document
    .querySelectorAll(".edit-link")
    .forEach(element =>
      element.addEventListener("click", () =>
        edit(element.getAttribute("value"))
      )
    );
});

getStartingData();
