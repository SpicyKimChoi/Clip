import { EntityRepository, AbstractRepository } from "typeorm";
import { Projects } from "../entity/Projects";

@EntityRepository(Projects)
export class ProjectsRepository extends AbstractRepository<Projects> {
	
	//프로젝트 생성
	createProject(name: string):Promise<Projects> {
		try {
			const project = new Projects();
			project.name = name;
			return this.manager.save(project);
			
		} catch (err) {
			console.log(err);
			return err;
		}
	}

}