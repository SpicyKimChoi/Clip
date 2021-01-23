import { EntityRepository, AbstractRepository, getRepository } from "typeorm";
import { ProjectPermissions } from "../entity/ProjectPermissons";
import { Users } from "../entity/Users";
import { Projects } from "../entity/Projects";

@EntityRepository(ProjectPermissions)
export class ProjectsPermissionsRepository extends AbstractRepository<ProjectPermissions> {

	//권한 추가
	async addPermission(userUuid: string, projectId: number, isAdmin: boolean): Promise<ProjectPermissions>  {
		try {
			const userRepository = getRepository(Users);
			const projectsRepository = getRepository(Projects);

			const user = await userRepository.findOne({uuid: userUuid});
			const project = await projectsRepository.findOne({id: projectId});

			const permission = new ProjectPermissions();
			permission.user_id = user;
			permission.project_id = project;
			permission.isAdmin = isAdmin;
			
			return this.manager.save(permission);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

}