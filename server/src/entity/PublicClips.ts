import {
	Entity,
	Column,
	ManyToOne,
} from "typeorm";
import { Base } from "./Base";
import { Users } from "./Users";
import { Projects } from "./Projects";

export enum ClipType {
	BOOKMARK = "bookmark",
	MEMO = "memo",
}

@Entity()
export class PublicClips extends Base {
	@Column()
	title: string;

	@Column()
	index: number;

	@Column({
		type: "text",
		nullable: true
	})
	description: string;

	@Column({
		type: "enum",
		enum: ClipType,
		default: ClipType.MEMO
	})
	type: ClipType
	
	@ManyToOne(() => Projects, (proj) => proj.publicClips, {
    onDelete: "CASCADE",
  })
  project_id!: Projects; 
}
