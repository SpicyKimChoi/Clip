import { 
	Entity, 
	ManyToOne,
	JoinColumn,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Tasks } from "./Tasks";
import { Labels } from "./Labels";
@Entity()
export class TaskLabel {

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Tasks, (task) => task.label, {
    onDelete: "CASCADE",
	})
	@JoinColumn({name: "task_id"})
  task_id: Tasks; 

	@ManyToOne(() => Labels, (label) => label.label, {
    onDelete: "CASCADE",
	})
	@JoinColumn({name: "label_id"})
  label_id: Labels; 

}
