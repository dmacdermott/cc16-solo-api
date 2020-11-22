async function getData() {
  const response = await fetch("http://localhost:3000/projects", {
    method: "GET",
  })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(e => console.log(e));
  return response;
}

async function getAProject(idOrName) {
  const response = await fetch(`http://localhost:3000/projects/${idOrName}`, {
    method: "GET",
  })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(e => console.log(e));
  return response;
}

async function getAllProjectsByType(type) {
  const response = await fetch(`http://localhost:3000/types/${type}`, {
    method: "GET",
  })
    .then(data => data.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(e => console.log(e));
  return response;
}

let newProject = {
  projectName: "testProject",
  type: "test",
  link: "test.com",
  basic_req: true,
  adv_req: true,
  todo: true,
};

async function insertNewProject() {
  const response = await fetch(`http://localhost:3000/projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProject),
  })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(e => console.log(e));
}

const putId = 16;
const updatedObj = {
  projectName: "UPDATED!!!",
  type: "update",
  link: "update link",
  basic_req: false,
  adv_req: false,
  todo: false,
};

async function updateProject() {
  const response = await fetch(`http://localhost:3000/projects/${putId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedObj),
  })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(e => console.log(e));
}
const deleteId = 26;
async function deleteProject() {
  const response = await fetch(`http://localhost:3000/projects/${deleteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(e => console.log(e));
  return response;
}

export {
  getData,
  getAProject,
  deleteProject,
  updateProject,
  insertNewProject,
  getAllProjectsByType,
  // getAProjectByName,
};
