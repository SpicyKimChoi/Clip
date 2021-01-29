import { EntityRepository, AbstractRepository, getRepository, getCustomRepository, MoreThan } from "typeorm";
import { Clips, ClipType } from "../entity/Clips";
import { Projects } from "../entity/Projects";
import { Users } from "../entity/Users";
import { ProjectsPermissionsRepository } from "../repositories/ProjectPermissionRepo"

@EntityRepository(Clips)
export class ClipsRepository extends AbstractRepository<Clips>{
	
} 