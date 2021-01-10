import { 
	Entity, 
	Column,
	OneToMany
} from "typeorm";
import {ProjectPermissions} from './ProjectPermissons'
import { Base } from "./Base";


@Entity()
export class Users extends Base{
	@Column()
	username: string;

	@Column()
	social_id: string;

	@OneToMany(() => ProjectPermissions, pp => pp.user_id)
	projectPermissions: ProjectPermissions[];
}
