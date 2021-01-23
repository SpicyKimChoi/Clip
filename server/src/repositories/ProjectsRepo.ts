import { EntityRepository, AbstractRepository, getRepository } from "typeorm";
import { Projects } from "../entity/Projects";
import { Users } from "../entity/Users";
import { ProjectPermissions } from "../entity/ProjectPermissons";

@EntityRepository(Projects)
export class ProjectsRepository extends AbstractRepository<Projects> {

	//프로젝트 생성
	createProject(name: string): Promise<Projects> {
		try {
			const project = new Projects();
			project.name = name;
			return this.manager.save(project);

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async getProjects(userUuid: string): Promise<Projects[]> {
		try {
			const userRepository = getRepository(Users);
			const user = await userRepository.findOne({ uuid: userUuid });

			return this.repository.createQueryBuilder("p")
				.leftJoinAndSelect("p.projectPermissions", "pp")
				.where("pp.user_id = :user_id", {user_id: user.id})
				.getMany()

		} catch (err) {
			console.log(err);
			return err;
		}
	}

}