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
}