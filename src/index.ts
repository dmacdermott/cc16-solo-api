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
    //Get one project
    app.get("/projects/:id", async function(req, res) {
        const results = await projectsRepository.findOne(req.params.id);
        return res.send(results);
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
