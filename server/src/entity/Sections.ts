import { 
	Entity, 
	Column,
	ManyToOne,
	OneToMany,
	JoinColumn
} from "typeorm";
import { Base } from "./Base";
import { Projects } from "./Projects";
import { Tasks } from "./Tasks";


@Entity()
export class Sections extends Base{
	@Column()
	title: string;

	@Column({
		nullable: true
	})
	index: number;

	@ManyToOne(() => Projects, (proj) => proj.section, {
    onDelete: "CASCADE",
	})
	@JoinColumn({name: "project_id"})
	project_id!: Projects; 
	
	@OneToMany(() => Tasks, task => task.section_id)
	task: Tasks[];
}
