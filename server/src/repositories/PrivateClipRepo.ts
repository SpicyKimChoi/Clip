import { EntityRepository, AbstractRepository, getRepository, getCustomRepository, MoreThan } from "typeorm";
import { PrivateClips, ClipType } from "../entity/PrivateClips";
import { Projects } from "../entity/Projects";
import { Users } from "../entity/Users";
import { ProjectsPermissionsRepository } from "./ProjectPermissionRepo"
import { errorTypes } from "../controllers/utils/errors/privateClipsErrors";

@EntityRepository(PrivateClips)
export class PrivateClipsRepository extends AbstractRepository<PrivateClips>{
	async getLastIdx(projId: number, userUuid: string): Promise<number>{
		try {
			const projRepo = getRepository(Projects);
			const userRepo = getRepository(Users);

			const proj = await projRepo.findOne({id: projId});
			const user = await userRepo.findOne({uuid: userUuid});

			const obj = await this.repository.findAndCount({user_id: user, project_id:proj});
			const num = obj[1];
			console.log(obj);

			return num || 0;

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async createClip(userUuid: string, projectId: number, title: string, description: string, isMemo: boolean){
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if(!isin) throw (errorTypes.PERMISSION_ERROR.message) //해당 프로젝트에 유저가 없음

			const userRepo = getRepository(Users);
			const projRepo = getRepository(Projects);

			const user = await userRepo.findOne({uuid: userUuid});
			const proj = await projRepo.findOne({id: projectId});

			const clip = new PrivateClips();
			clip.user_id = user;
			clip.project_id = proj;
			clip.title = title;
			clip.description = description;
			clip.index = await this.getLastIdx(projectId, userUuid) + 1;
			if(isMemo) clip.type = ClipType.MEMO;
			else clip.type = ClipType.BOOKMARK;

			return this.repository.save(clip);
			
		} catch (error) {
			console.log(error);
			return new Error(error);
		}	
	}

	async getAllClips(userUuid: string, projectId: number) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if(!isin) throw (errorTypes.PERMISSION_ERROR.message) //해당 프로젝트에 유저가 없음

			const userRepo = getRepository(Users);
			const projRepo = getRepository(Projects);

			const user = await userRepo.findOne({uuid: userUuid});
			const proj = await projRepo.findOne({id: projectId});

			return this.repository.find({user_id: user, project_id: proj});
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async getClip(userUuid: string, clipId: number) {
		try {
		
			const userRepo = getRepository(Users);
			const user = await userRepo.findOne({uuid: userUuid});
			// const clip = await this.repository.findOne({id:clipId});
			const clip = await this.repository
				.createQueryBuilder('c')
				.leftJoinAndSelect('c.user_id', 'u')
				.where('c.id = :clipId', {clipId})
				.getOne();

			if(clip.user_id.id !== user.id) throw new Error("permission Error")

			return clip;
		} catch (err) {
			console.log(err);
			return err;
		}
	}
} 