import { 
	Entity, 
	Column,
	OneToMany
} from "typeorm";
import {ProjectPermissions} from './ProjectPermissons'
import { Base } from "./Base";
import { Clips } from "./Clips";
import { Assignee } from "./Assignee";
import { Likes } from "./Likes";
import { Comments } from "./Comments";


@Entity()
export class Users extends Base{
	@Column()
	username: string;
	
	@Column({
		unique: true
	})
	social_id: string;

	@Column()
	email: string;

	@OneToMany(() => ProjectPermissions, pp => pp.user_id)
	projectPermissions: ProjectPermissions[];

	@OneToMany(() => Clips, clip => clip.user_id)
	clips: Clips[];

	@OneToMany(() => Assignee, a => a.user_id)
	assignee: Assignee[];

	@OneToMany(() => Likes, like => like.user_id)
	like: Likes[];

	@OneToMany(() => Comments, comment => comment.user_id)
	comment: Comments[];
}
