import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Projects {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    projectName: string;
    @Column()
    type: string;
    @Column()
    link: string;
    @Column()
    basic_req: boolean;
    @Column({nullable: true})
    med_req: boolean;
    @Column({nullable: true})
   adv_req: boolean;
    @Column({nullable: true})
   nightmare: boolean;
    @Column({nullable: true})
   todo: boolean;
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updateDate: Date;

}

export default Projects;