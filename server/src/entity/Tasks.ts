import { 
	Entity, 
	Column,
	ManyToOne,
	JoinColumn,
	OneToMany
} from "typeorm";
import { Base } from "./Base";
import { Sections } from "./Sections";
import { TaskLabel } from "./TaskLabel";
import { Assignee } from "./Assignee";
import { Likes } from "./Likes";
import { Comments } from "./Comments";


@Entity()
export class Tasks extends Base{
	@Column()
	title: string;

	@Column({
		nullable: true
	})
	section_index: number;

	@Column({type: "text", nullable: true})
	description: string;

	@Column({
		default: false
	})
	is_completed: boolean;

	@Column({nullable: true})
	start_date: Date;

	@Column({nullable: true})
	due_date: Date;

	@ManyToOne(() => Sections, (section) => section.task, {
    onDelete: "CASCADE",
	})
	@JoinColumn({name: "section_id"})
	section_id!: Sections; 
	
	@OneToMany(() => TaskLabel, (label) => label.task_id)
	label: TaskLabel[];

	@OneToMany(() => Assignee, a => a.task_id)
	assignee: Assignee[];

	@OneToMany(() => Likes, like => like.task_id)
	like: Likes[];

	@OneToMany(() => Comments, comment => comment.task_id)
	comment: Comments[];
}
