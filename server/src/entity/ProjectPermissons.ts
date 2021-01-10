import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column,
	ManyToOne,
} from "typeorm";
import { Users } from "./Users";
import { Projects } from "./Projects"
 
@Entity()
export class ProjectPermissions {

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Users, (user) => user.projectPermissions, {
    onDelete: "CASCADE",
  })
  user_id!: Users; 

	@ManyToOne(() => Projects, (proj) => proj.projectPermissions, {
    onDelete: "CASCADE",
  })
  project_id!: Projects; 

	@Column()
	isAdmin: boolean
}
