async function getData() {
  const response = await fetch("http://localhost:3000/projects", {
    method: "GET",
  })
    .then(data => data.json())
    .then(data => {
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
      return data;
    })
    .catch(e => console.log(e));
  return response;
}

async function getByRequirement(req) {
  const response = await fetch(`http://localhost:3000/requirements/${req}`, {
    method: "GET",
  })
    .then(data => data.json())
    .then(data => {
      return data;
    })
    .catch(e => console.log(e));
  return response;
}

async function insertNewProject(newProject) {
  const response = await fetch(`http://localhost:3000/projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProject),
  })
    .then(data => data.json())
    .catch(e => console.log(e));
  return response;
}

async function updateProject(projectId, edits) {
  const response = await fetch(`http://localhost:3000/projects/${projectId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(edits),
  })
    .then(data => data.json())
    .catch(e => console.log(e));
  return response;
}

async function deleteProject(id) {
  const response = await fetch(`http://localhost:3000/projects/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then(data => data.json())
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
  getByRequirement,
};
