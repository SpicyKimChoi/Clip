import { 
	Entity, 
	Column, 
	OneToMany
} from "typeorm";
import {ProjectPermissions} from './ProjectPermissons'
import { Base } from "./Base";
import { PrivateClips } from "./PrivateClips";
import { Sections } from "./Sections";
import { PublicClips } from "./PublicClips";

@Entity()
export class Projects extends Base{

	@Column()
	name: string;

	@Column({
		type: "text",
		nullable: true
	})
	description: string;

	@OneToMany(() => ProjectPermissions, pp => pp.project_id)
	projectPermissions: ProjectPermissions[];

	@OneToMany(() => PrivateClips, clip => clip.project_id)
	privateClips: PrivateClips[];

	@OneToMany(() => PublicClips, clip => clip.project_id)
	publicClips: PublicClips[];

	@OneToMany(() => Sections, section => section.project_id)
	section: Sections[];
}
