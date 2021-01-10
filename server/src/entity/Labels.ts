import { 
	Entity, 
	Column,
	ManyToOne,
	OneToMany,
	JoinColumn
} from "typeorm";
import { Base } from "./Base";
import { Projects } from "./Projects";
import { TaskLabel } from "./TaskLabel";

@Entity()
export class Labels extends Base{
	@Column()
	name: string;

	@Column()
	color: string;

	@ManyToOne(() => Projects, (proj) => proj.section, {
    onDelete: "CASCADE",
	})
	@JoinColumn({name: "project_id"})
	project_id!: Projects; 

	@OneToMany(() => TaskLabel, (label) => label.task_id)
	label: TaskLabel[];
}
