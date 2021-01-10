import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {

	@PrimaryGeneratedColumn()
	id: number;

	@PrimaryGeneratedColumn("uuid")
	uuid: string;

	@Column()
	username: string;

	@Column()
	social_id: string;

}
