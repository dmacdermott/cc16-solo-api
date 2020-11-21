import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import Projects from "../entity/Projects"
const projectData = require("./projects.json")


export default class CreateProjects implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
        .createQueryBuilder()
        .insert()
        .into(Projects)
        .values(projectData)
        .execute()
        
    }
}