import { EntityRepository, AbstractRepository, getRepository } from "typeorm";
import { ProjectPermissions } from "../entity/ProjectPermissons";
import { Users } from "../entity/Users";
import { Projects } from "../entity/Projects";

@EntityRepository(ProjectPermissions)
export class ProjectsPermissionsRepository extends AbstractRepository<ProjectPermissions> {

	//권한 추가
	async addPermission(userUuid: string, projectId: number, isAdmin: boolean): Promise<ProjectPermissions> {
		try {
			const userRepository = getRepository(Users);
			const projectsRepository = getRepository(Projects);

			const user = await userRepository.findOne({ uuid: userUuid });
			const project = await projectsRepository.findOne({ id: projectId });

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

	async getPermission(userUuid: string, projectId: number): Promise<boolean> {
		try {
			const userRepository = getRepository(Users);
			const projectsRepository = getRepository(Projects);

			const user = await userRepository.findOne({ uuid: userUuid });
			const project = await projectsRepository.findOne({ id: projectId });

			const permission = await this.repository.findOne({ user_id: user, project_id: project });
			return permission.isAdmin;
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async inviteTeammate(userUuid: string, projectId: number, email: string, isAdmin: boolean): Promise<ProjectPermissions> {
		try {
			const userRepository = getRepository(Users);
			const projectsRepository = getRepository(Projects);

			const isamiAdmin = await this.getPermission(userUuid, projectId);
			if (!isamiAdmin) throw new Error();

			const teammate = await userRepository.findOne({ email: email });
			const project = await projectsRepository.findOne({ id: projectId });
			// console.log(teammate);

			const permission = new ProjectPermissions();
			permission.project_id = project;
			permission.user_id = teammate;
			permission.isAdmin = isAdmin;
			// console.log(permission);
			return this.manager.save(permission);

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async isUserInsideProj(userUuid: string, projectId: number): Promise<boolean> {
		try {
			const userRepository = getRepository(Users);
			const projectsRepository = getRepository(Projects);

			const user = await userRepository.findOne({ uuid: userUuid });
			const project = await projectsRepository.findOne({ id: projectId });

			const permission = await this.repository.findOne({ user_id: user, project_id: project });

			return !!permission;
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async getUsers(userUuid: string, projectId: number): Promise<ProjectPermissions[]> {
		try {
			const projectsRepository = getRepository(Projects);

			const isin = await this.isUserInsideProj(userUuid, projectId);
			if (!isin) throw new Error();

			const project = await projectsRepository.findOne({ id: projectId });

			return this.repository.createQueryBuilder('pp')
				.leftJoinAndSelect("pp.user_id", 'u')
				.select(['pp.isAdmin', 'u.uuid', 'u.username', 'u.email'])
				.where("pp.user_id = u.id")
				.andWhere('pp.project_id = :proj_id', { proj_id: project.id })
				.getMany();
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async kickUser(userUuid: string, projectId: number, email: string): Promise<ProjectPermissions[]> {
		try {
			const userRepository = getRepository(Users);
			const projectsRepository = getRepository(Projects);

			const isamiAdmin = await this.getPermission(userUuid, projectId);
			if (!isamiAdmin) throw new Error();

			const teammate = await userRepository.findOne({ email: email });
			const project = await projectsRepository.findOne({ id: projectId });

			await this.repository.delete({ user_id: teammate, project_id: project });

			return this.getUsers(userUuid, projectId);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async editPermission(userUuid: string, projectId: number, email: string, isAdmin: boolean): Promise<ProjectPermissions[]> {
		try {
			const userRepository = getRepository(Users);
			const projectsRepository = getRepository(Projects);

			const isamiAdmin = await this.getPermission(userUuid, projectId);
			if (!isamiAdmin) throw new Error();

			const teammate = await userRepository.findOne({ email: email });
			const project = await projectsRepository.findOne({ id: projectId });

			await this.repository.update({user_id: teammate, project_id: project}, {isAdmin: isAdmin});

			return this.getUsers(userUuid, projectId);
		} catch (err) {
			console.log(err);
			return err;
		}
	}
}