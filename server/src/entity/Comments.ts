import { 
	Entity, 
	ManyToOne,
	JoinColumn,
	Column,
} from "typeorm";
import { Users } from "./Users";
import { Tasks } from "./Tasks";
import { Base } from "./Base";


@Entity()
export class Comments extends Base {

	@Column({type: "text"})
	content: string;

	@ManyToOne(() => Tasks, (task) => task.like, {
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
