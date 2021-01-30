import { EntityRepository, AbstractRepository, getRepository, getCustomRepository } from "typeorm";
import { Projects } from "../entity/Projects";
import { Users } from "../entity/Users";
import { ProjectsPermissionsRepository } from "./ProjectPermissionRepo"
import { errorTypes } from "../controllers/utils/errors/privateClipsErrors";
import { PublicClips, ClipType } from "../entity/PublicClips";

@EntityRepository(PublicClips)
export class PublicClipsRepository extends AbstractRepository<PublicClips>{
	async getLastIdx(projId: number, userUuid: string): Promise<number> {
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

	async createClip(userUuid: string, projectId: number, title: string, description: string, isMemo: boolean) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw (errorTypes.PERMISSION_ERROR.message) //해당 프로젝트에 유저가 없음

			const projRepo = getRepository(Projects);

			const proj = await projRepo.findOne({ id: projectId });

			const clip = new PublicClips();
			clip.project_id = proj;
			clip.title = title;
			clip.description = description;
			clip.index = await this.getLastIdx(projectId, userUuid) + 1;
			if (isMemo) clip.type = ClipType.MEMO;
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
			if (!isin) throw (errorTypes.PERMISSION_ERROR.message) //해당 프로젝트에 유저가 없음

			const projRepo = getRepository(Projects);

			const proj = await projRepo.findOne({ id: projectId });

			return this.repository.find({
				where: { project_id: proj },
				order: { index: 'ASC' }
			});
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async getClip(userUuid: string,projectId: number, clipId: number) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw (errorTypes.PERMISSION_ERROR.message) //해당 프로젝트에 유저가 없음
			const clip = await this.repository.findOne({id: clipId});

			return clip;
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async editClip(userUuid: string,projectId: number, clipId: number, title: string, description: string) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw (errorTypes.PERMISSION_ERROR.message) //해당 프로젝트에 유저가 없음

			const clip = await this.repository.findOne({id: clipId});

			title = title || clip.title;
			description = description || clip.description;

			await this.repository.update({ id: clipId }, { title, description });

			return this.repository.findOne({ id: clipId });
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async delClip(userUuid: string, clipId: number, projectId: number) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw (errorTypes.PERMISSION_ERROR.message) //해당 프로젝트에 유저가 없음
			
			const projRepo = getRepository(Projects);

			const proj = await projRepo.findOne({ id: projectId });
			const clip = await this.repository.findOne({id: clipId});

			const clips = await this.repository
				.createQueryBuilder('c')
				.leftJoinAndSelect('c.project_id', 'p')
				.where('p.id = :projectId', { projectId: projectId })
				.andWhere('c.index > :curIdx', { curIdx: clip.index })
				.getMany()

			await this.repository.delete({ id: clipId });

			for (let i = 0; i < clips.length; i++) {
				await this.repository.update({ id: clips[i].id }, { index: clips[i].index - 1 });
			}
			return this.repository.find({
				where: { project_id: proj },
				order: { index: 'ASC' }
			});
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async moveClip(userUuid: string, clipId: number, projectId: number, index: number) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw (errorTypes.PERMISSION_ERROR.message) //해당 프로젝트에 유저가 없음

			const projRepo = getRepository(Projects);

			const proj = await projRepo.findOne({ id: projectId });
			const clip = await this.repository.findOne({id: clipId});

			//8 -> 2, (2~7) +=1
			if (clip.index > index) {
				const clips = await this.repository
					.createQueryBuilder('c')
					.leftJoinAndSelect('c.project_id', 'p')
					.where('p.id = :projectId', { projectId: projectId })
					.andWhere('c.index >= :start AND c.index < :end', { start: index, end: clip.index })
					.getMany()

				console.log(clips);

				for (let i = 0; i < clips.length; i++) {
					await this.repository.update({ id: clips[i].id }, { index: clips[i].index + 1 });
				}
			} else if (clip.index < index) {
				const clips = await this.repository
					.createQueryBuilder('c')
					.leftJoinAndSelect('c.project_id', 'p')
					.where('p.id = :projectId', { projectId: projectId })
					.andWhere('c.index > :start AND c.index <= :end', { start: clip.index, end: index })
					.getMany()

				console.log(clips);

				for (let i = 0; i < clips.length; i++) {
					await this.repository.update({ id: clips[i].id }, { index: clips[i].index - 1 });
				}
			}

			await this.repository.update({id: clipId}, {index: index});

			return this.repository.find({
				where: { project_id: proj },
				order: { index: 'ASC' }
			});
		} catch (err) {
			console.log(err);
			return err;
		}
	}


} 