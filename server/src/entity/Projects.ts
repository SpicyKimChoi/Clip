import { 
	Entity, 
	Column, 
	OneToMany
} from "typeorm";
import {ProjectPermissions} from './ProjectPermissons'
import { Base } from "./Base";
import { Clips } from "./Clips";
import { Sections } from "./Sections";

@Entity()
export class Projects extends Base{

	@Column()
	name: string;

	@OneToMany(() => ProjectPermissions, pp => pp.project_id)
	projectPermissions: ProjectPermissions[];

	@OneToMany(() => Clips, clip => clip.project_id)
	clips: Clips[];

	@OneToMany(() => Sections, section => section.project_id)
	section: Sections[];
}
