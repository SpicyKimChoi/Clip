import { 
	PrimaryGeneratedColumn, 
	Column,
	Generated,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

export abstract class Base {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
