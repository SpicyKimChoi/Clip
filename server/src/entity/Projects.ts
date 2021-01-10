import { 
	Entity, 
	Column, 
	OneToMany
} from "typeorm";
import {ProjectPermissions} from './ProjectPermissons'
import { Base } from "./Base";

@Entity()
export class Projects extends Base{

	@Column()
	name: string;

	@OneToMany(() => ProjectPermissions, pp => pp.project_id)
	projectPermissions: ProjectPermissions[];

}
