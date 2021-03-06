import { EntityRepository, AbstractRepository, getRepository, getCustomRepository } from "typeorm";
import { Projects } from "../entity/Projects";
import { Users } from "../entity/Users";
import { ProjectPermissions } from "../entity/ProjectPermissons";
import { ProjectsPermissionsRepository } from "./ProjectPermissionRepo";

@EntityRepository(Projects)
export class ProjectsRepository extends AbstractRepository<Projects> {

	//프로젝트 생성
	createProject(name: string, description: string): Promise<Projects> {
		try {
			const project = new Projects();
			project.name = name;
			project.description = description;
			
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

	async editProject(userUuid: string, projectId: string, name: string | undefined, description: string | undefined): Promise<Projects> {
		try {
			const userRepository = getRepository(Users);
			const ppRepository = getRepository(ProjectPermissions);
			
			const project = await this.repository.findOne({id: Number(projectId)});
			const user = await userRepository.findOne({ uuid: userUuid });
			const permission = await ppRepository.findOne({ user_id: user, project_id:project});

			console.log(permission);
			console.log(permission.isAdmin);

			name = name || project.name;
			description = description || project.description;

			//프로젝트 수정 권한이 없는 경우 실행 
			if(!permission.isAdmin) throw new Error('permission error');
			
			//프로젝트 
			await this.repository.update(projectId, {name, description});

			//변경된 프로젝트 반환
			return this.repository.findOne({id: Number(projectId)});
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async deleteProject(userUuid: string, projectId: number) {
		try {
			const projPermissionRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isAdmin = await projPermissionRepo.getPermission(userUuid, projectId);

			if(!isAdmin) throw new Error('권한 없음');

			await this.repository.delete({id: projectId});

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async getAllTasksByProjectId(projectId: number){
		try {
			const projRepo = getRepository(Projects);

			const project = await projRepo
				.createQueryBuilder('p')
				.leftJoinAndSelect('p.privateClips', 'pric')
				.leftJoinAndSelect('p.publicClips', 'pubc')
				.leftJoinAndSelect('p.projectPermissions', 'pp')
				.leftJoinAndSelect('p.section', 'sec')
				.leftJoinAndSelect('pp.user_id', 'ppu')
				.leftJoinAndSelect('sec.task', 'ts')
				.leftJoinAndSelect('ts.assignee', 'a')
				.leftJoinAndSelect('a.user_id', 'au')
				.where('p.id = :projectId', {projectId})
				.getOne()

			return project;
			
		} catch (err) {
			console.log(err);
			return err;
		}
	}
}