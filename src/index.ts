import "reflect-metadata";
import { createConnection } from "typeorm";
// import {User} from "./entity/User";
import * as express from "express";
import Projects from "./entity/Projects";
var cors = require("cors");

//Create connection to db
createConnection()
  .then(async connection => {
    const projectsRepository = connection.getRepository(Projects);

    //Create and setup server
    const app = express();
    app.use(express.json());
    app.use(cors());

    //Rest Routes
    //GET
    //Get projects
    app.get("/projects", async function (req, res) {
      //Sort queries if type or requirement
      const [query] = Object.keys(req.query);
      if (query === "type") {
        const projectsQuery = await projectsRepository.find(req.query);
        res.json(projectsQuery);
      } else if (query === "requirement") {
        let key = req.query.requirement;
        const obj = { [key]: false };
        if (key === "todo") {
          obj[key] = true;
        }
        const projectsQuery = await projectsRepository.find(obj);
        res.json(projectsQuery);
      } else {
        //get all projects
        const projects = await projectsRepository.find();
        res.json(projects);
      }
    });

    //Get one project by id or name
    app.get("/projects/:idOrName", async function (req, res) {
      if (isNaN(req.params.idOrName)) {
        req.params = { projectName: req.params.idOrName };
      } else {
        req.params = { id: req.params.idOrName };
      }
      const results = await projectsRepository.findOne(req.params);
      return res.send(results);
    });

    //Post project
    app.post("/projects", async function (req, res) {
      const project = await projectsRepository.create(req.body);
      const results = await projectsRepository.save(project);
      return res.send(results);
    });
    //Put project
    app.put("/projects/:id", async function (req, res) {
      const results = await projectsRepository.findOne(req.params);
      projectsRepository.merge(results, req.body);
      const updatedProject = projectsRepository.save(results);
      return res.send(updatedProject);
    });
    //Delete project
    app.delete("/projects/:id", async function (req, res) {
      const results = await projectsRepository.delete(req.params);
      return res.send(results);
    });

    //Start server
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch(error => console.log(error));
