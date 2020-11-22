import "reflect-metadata";
import {createConnection} from "typeorm";
// import {User} from "./entity/User";
import * as express from "express";
import Projects from "./entity/Projects";


//Create connection to db
createConnection().then(async connection => {
    const projectsRepository = connection.getRepository(Projects);

    //Create and setup server
    const app = express()
    app.use(express.json());

    
    //Rest Routes
    //GET
    //Get all projects
     app.get("/projects", async function(req, res) {
    const projects = await projectsRepository.find();
     res.json(projects)
    });
    // Get all projects of one type
     app.get("/types/:type", async function(req, res) {
    const projects = await projectsRepository.find(req.params);
     res.json(projects)
    });

    //Get one project by id or name
    app.get("/projects/:idOrName", async function(req, res) {
        if(isNaN(req.params.idOrName)){
            req.params = {projectName: req.params.idOrName}
        } else {
            req.params = {id: req.params.idOrName}
        }
        const results = await projectsRepository.findOne(req.params);
        return res.send(results);
    });

      //Get uncompleted projects by requirements
      app.get("/requirements/:requirement", async function(req, res) {
          let key = req.params.requirement
            const obj = { [key]: false }
        const projects = await projectsRepository.find(obj);
        res.json(projects)
    });
   
    //Post project
    app.post("/projects", async function(req, res) {
        console.log(req.body)
        const project = await projectsRepository.create(req.body)
        const results = await projectsRepository.save(project);
        return res.send(results)
    });
    //Put project
    app.put(`/projects/:id`, async function(req, res) {
        const results = await projectsRepository.findOne(req.params.id);
        projectsRepository.merge(results, req.body)
       const updatedProject =  projectsRepository.save(results)
        return res.send(updatedProject);
    });
       //Delete project
       app.delete("/projects/:id", async function(req, res) {
        const results = await projectsRepository.delete(req.params.id);
        return res.send(results);
    });


    //Start server
    const port = 3000
    app.listen(port, ()=>{
        console.log(`Server started on port ${port}`)
    })
    
}).catch(error => console.log(error));
