import React, { useState, useEffect } from "react";
import "./stats.css";

function Stats({ projects }) {
  const [basicReq, setBasicReq] = useState({ complete: 0, total: 0 });
  const [medReq, setMedReq] = useState({ complete: 0, total: 0 });
  const [advReq, setAdvReq] = useState({ complete: 0, total: 0 });
  const [nightmare, setNightmare] = useState({ complete: 0, total: 0 });
  let [toDo, setToDo] = useState(0);

  useEffect(() => {
    projects.forEach(project => {
      if (project.basic_req !== null) {
        setBasicReq({ ...basicReq, ...{ total: (basicReq.total += 1) } });
        if (project.basic_req) {
          setBasicReq({
            ...basicReq,
            ...{ complete: (basicReq.complete += 1) },
          });
        }
      }
      if (project.med_req !== null) {
        setMedReq({ ...medReq, ...{ total: (medReq.total += 1) } });
        if (project.med_req) {
          setMedReq({ ...medReq, ...{ complete: (medReq.complete += 1) } });
        }
      }
      if (project.adv_req !== null) {
        setAdvReq({ ...advReq, ...{ total: (advReq.total += 1) } });
        if (project.adv_req) {
          setAdvReq({ ...advReq, ...{ complete: (advReq.complete += 1) } });
        }
      }
      if (project.nightmare !== null) {
        console.log(project.id);
        setNightmare({ ...nightmare, ...{ total: (nightmare.total += 1) } });
        console.log(nightmare);
        if (project.nightmare) {
          setNightmare({
            ...nightmare,
            ...{ complete: (nightmare.complete += 1) },
          });
        }
      }
      if (project.todo) {
        setToDo((toDo += 1));
      }
    });
  }, [setBasicReq, setAdvReq, setMedReq, setNightmare, setToDo]);

  return (
    <section id="stats-wrapper">
      <div className="stats">
        <h3 className="stats-heading">
          <span id="basic-stat-underline">Basic </span>
        </h3>
        <div className="stat" id="basic-req-stat">
          {basicReq.complete}/{basicReq.total}
        </div>
      </div>
      <div className="stats">
        <h3 className="stats-heading">
          <span id="medium-stat-underline">Medium</span>
        </h3>
        <div className="stat" id="med-req-stat">
          {medReq.complete}/{medReq.total}
        </div>
      </div>
      <div className="stats">
        <h3 className="stats-heading">
          <span id="advanced-stat-underline">Advanced</span>
        </h3>
        <div className="stat" id="adv-req-stat">
          {advReq.complete}/{advReq.total}
        </div>
      </div>
      <div className="stats">
        <h3 className="stats-heading">
          <span id="nightmare-stat-underline">Nightmare</span>
        </h3>
        <div className="stat" id="nightmare-stat">
          {nightmare.complete}/{nightmare.total}
        </div>
      </div>
      <div className="stats">
        <h3 className="stats-heading">
          <span id="todo-stat-underline">To-Dos</span>
        </h3>
        <div className="stat" id="to-do-stat">
          {toDo}
        </div>
      </div>
    </section>
  );
}

export default Stats;
