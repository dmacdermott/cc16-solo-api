import { getData } from "./data.js";

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
}
getStartingData();
