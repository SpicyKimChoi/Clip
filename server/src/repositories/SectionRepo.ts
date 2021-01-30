import { EntityRepository, AbstractRepository, getCustomRepository, getRepository } from "typeorm";
import { Sections } from "../entity/Sections";
import { ProjectsPermissionsRepository } from "./ProjectPermissionRepo";
import { Projects } from "../entity/Projects";

@EntityRepository(Sections)
export class SectionsRepository extends AbstractRepository<Sections>{
	async getLastIdx(projId: number): Promise<number> {
		try {
			const projRepo = getRepository(Projects);

			const proj = await projRepo.findOne({ id: projId });

			const obj = await this.repository.findAndCount({ project_id: proj });
			const num = obj[1];
			console.log(obj);

			return num || 0;

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async createSec (userUuid: string, projectId: number, title: string) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw new Error('해당 프로젝트에 유저가 없음');

			const projRepo = getRepository(Projects);
			const proj = await projRepo.findOne({id: projectId});

			const section = new Sections();
			section.title = title;
			section.project_id = proj;
			section.index = await this.getLastIdx(projectId) + 1;

			console.log(section);

			return this.repository.save(section);

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async editSect (userUuid: string, projectId: number, sectionId:number, title: string){
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw new Error('해당 프로젝트에 유저가 없음');

			await this.repository.update({id: sectionId}, {title: title});

			return this.repository.findOne({id: sectionId});

		} catch (err) {
			console.log(err);
			return err;
		}
	}
	
	async delSect(userUuid: string, projectId: number, sectionId:number){
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw new Error('해당 프로젝트에 유저가 없음');

			const projRepo = getRepository(Projects);
			const proj = await projRepo.findOne({id: projectId});
			const section = await this.repository.findOne({id: sectionId});

			const sections = await this.repository
				.createQueryBuilder('s')
				.leftJoinAndSelect('s.project_id', 'p')
				.where('p.id = :project_id', {project_id: projectId})
				.andWhere('s.index > :index', {index: section.index})
				.getMany();

			for(let i = 0; i < sections.length; i++){
				await this.repository.update({id: sections[i].id}, {index: sections[i].index - 1});
			}

			await this.repository.delete({id: sectionId});

			return this.repository.find({
				where: {project_id: proj},
				order: {index:'ASC'}
			});	//전부 받아오는 메소드로 변경 with tasks;
		} catch (err) {
			console.log(err);
			return err;
		}
	}
}