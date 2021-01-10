import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column,
	ManyToOne,
	JoinColumn,
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
	@JoinColumn({name: "user_id"})
  user_id!: Users; 

	@ManyToOne(() => Projects, (proj) => proj.projectPermissions, {
    onDelete: "CASCADE",
	})
	@JoinColumn({name: "project_id"})
  project_id!: Projects; 

	@Column()
	isAdmin: boolean
}
