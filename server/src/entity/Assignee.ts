import { 
	Entity, 
	ManyToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Tasks } from "./Tasks";


@Entity()
export class Assignee {

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Tasks, (task) => task.assignee, {
    onDelete: "CASCADE",
	})
	@JoinColumn({name: "task_id"})
  task_id: Tasks; 

	@ManyToOne(() => Users, (user) => user.assignee, {
    onDelete: "CASCADE",
	})
	@JoinColumn({name: "user_id"})
  user_id: Users; 

}
