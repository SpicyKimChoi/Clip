import { EntityRepository, AbstractRepository, getRepository } from "typeorm";
import { Clips, ClipType } from "../entity/Clips";
import { Projects } from "../entity/Projects";
import { Users } from "../entity/Users";

@EntityRepository(Clips)
export class ClipsRepository extends AbstractRepository<Clips>{
	
} 