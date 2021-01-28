import { EntityRepository, AbstractRepository, getRepository, getCustomRepository } from "typeorm";
import { Clips, ClipType } from "../entity/Clips";
import { Projects } from "../entity/Projects";
import { Users } from "../entity/Users";
import { ProjectsPermissionsRepository } from "../repositories/ProjectPermissionRepo"

@EntityRepository(Clips)
export class ClipsRepository extends AbstractRepository<Clips>{
	async getLastIdx(projId: number, userUuid: string | null): Promise<number>{
		try {
			const projRepo = getRepository(Projects);
			const userRepo = getRepository(Users);

			const proj = await projRepo.findOne({id: projId});
			let num: number;
			if(!!userUuid){
				const user = await userRepo.findOne({uuid: userUuid});
				const obj = await this.repository.findAndCount({user_id: user, project_id:proj});
				// console.log(num);
				// console.log(num[1]);
				num = obj[1];
			}else{
				const obj = await this.repository.findAndCount({user_id: null, project_id:proj});
				num = obj[1];
			}
			// console.log(num);
			if(num === undefined) num = 0;
			return num;

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async createClip(tilte: string, description: string, isMemo: boolean, isPrivate: boolean, uuid: string, projId: number){
		try {
			const customProjRepo = getCustomRepository(ProjectsPermissionsRepository)
			const isin = await customProjRepo.isUserInsideProj(uuid, projId);
			if (!isin) throw new Error();

			const clip = new Clips();

			const projRepo = getRepository(Projects);
			const userRepo = getRepository(Users);

			const proj = await projRepo.findOne({id: projId});
			const user = await userRepo.findOne({uuid});

			clip.title = tilte;
			clip.description = description;
			clip.project_id = proj;
			
			if(isMemo) clip.type = ClipType.MEMO;
			else clip.type = ClipType.BOOKMARK;

			if(isPrivate){ 
				clip.user_id = user;
				// console.log(await this.getLastIdx(projId, uuid));
				clip.index = await this.getLastIdx(projId, uuid) + 1;

			} else {
				// console.log(await this.getLastIdx(projId, null));
				clip.index = await this.getLastIdx(projId, null) + 1;
			}
			

			return this.repository.save(clip);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async getLists(userUuid: string, projectId: string, isPrivate: boolean): Promise<Clips[]>{
		try {
			const customProjRepo = getCustomRepository(ProjectsPermissionsRepository)
			const isin = await customProjRepo.isUserInsideProj(userUuid, Number(projectId));
			if (!isin) throw new Error();

			const projRepo = getRepository(Projects);
			const userRepo = getRepository(Users);

			const proj = await projRepo.findOne({id: Number(projectId)});
			const user = await userRepo.findOne({uuid: userUuid});

			console.log(isPrivate);
			if(isPrivate){
				// console.log('private')
				return this.repository.find({user_id:user, project_id: proj});
			}else{
				// console.log('pulic')
				return this.repository.find({user_id:null, project_id: proj});
			}
		} catch (err) {
			console.log(err);
			return err;
		}
	}
} 