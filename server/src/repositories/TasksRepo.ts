import { EntityRepository, AbstractRepository, getCustomRepository, getRepository } from "typeorm";
import { ProjectsPermissionsRepository } from "./ProjectPermissionRepo";
import { Projects } from "../entity/Projects";
import { Tasks } from "../entity/Tasks";
import { Sections } from "../entity/Sections";
import { isNullOrUndefined } from "util";
import { Labels } from "../entity/Labels";
import { Users } from "../entity/Users";
import { TaskLabel } from "../entity/TaskLabel";
import { Assignee } from "../entity/Assignee";

interface tasksParams{
	title: string;
	description: string | null;
	start_date: Date | null;
	due_date: Date | null;
	assignee: string[];
}

@EntityRepository(Tasks)
export class TasksRepository extends AbstractRepository<Tasks>{
	async getLastIdx(sectionId: number): Promise<number> {
		try {
			const sectionRepo = getRepository(Sections);
			const section = await sectionRepo.findOne({id: sectionId});

			const obj = await this.repository.findAndCount({ section_id: section });
			const num = obj[1];
			console.log(obj);

			return num || 0;

		} catch (err) {
			console.log(err);
			return err;
		}
	}
	async addLable(taskId: number, labelId: number){
		try {
			const taskLabelRepo = getRepository(TaskLabel);
			const taskLabel = new TaskLabel();

			const labelRepo = getRepository(Labels);
			const label = await labelRepo.findOne({id: labelId});
			const task = await this.repository.findOne({id: taskId});
			
			taskLabel.label_id = label;
			taskLabel.task_id = task;

			return taskLabelRepo.save(taskLabel);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async addAssignee(taskId: number, userUuid: string){
		try {
			const assigneeRepo = getRepository(Assignee);
			const assignee = new Assignee();

			const userRepo = getRepository(Users);
			const user = await userRepo.findOne({uuid: userUuid});
			const task = await this.repository.findOne({id: taskId});

			assignee.user_id = user;
			assignee.task_id = task;

			return assigneeRepo.save(assignee);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async createTask (userUuid: string, projectId: number, sectionId: number, labelIds: number[], tasksParams: tasksParams) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw new Error('해당 프로젝트에 유저가 없음');

			const sectionRepo = getRepository(Sections);
			const section = await sectionRepo.findOne({id: sectionId});

			const task = new Tasks();
			task.title = tasksParams.title;
			task.section_id = section;
			task.section_index = await this.getLastIdx(sectionId) + 1;
			task.description = tasksParams.description;
			task.start_date = tasksParams.start_date;
			task.due_date = tasksParams.due_date;

			const curTask = await this.repository.save(task);

			//라벨 추가
			for(let i = 0; i < labelIds.length; i++){
				await this.addLable(curTask.id, labelIds[i]);
			}
			
			//어사이니추가
			for(let i = 0; i < labelIds.length; i++){
				await this.addAssignee(curTask.id, tasksParams.assignee[i]);
			}

			return curTask
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	// async editSect (userUuid: string, projectId: number, sectionId:number, title: string){
	// 	try {
	// 		const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
	// 		const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
	// 		console.log(isin);
	// 		if (!isin) throw new Error('해당 프로젝트에 유저가 없음');

	// 		await this.repository.update({id: sectionId}, {title: title});

	// 		return this.repository.findOne({id: sectionId});

	// 	} catch (err) {
	// 		console.log(err);
	// 		return err;
	// 	}
	// }
	
	// async delSect(userUuid: string, projectId: number, sectionId:number){
	// 	try {
	// 		const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
	// 		const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
	// 		console.log(isin);
	// 		if (!isin) throw new Error('해당 프로젝트에 유저가 없음');

	// 		const projRepo = getRepository(Projects);
	// 		const proj = await projRepo.findOne({id: projectId});
	// 		const section = await this.repository.findOne({id: sectionId});

	// 		const sections = await this.repository
	// 			.createQueryBuilder('s')
	// 			.leftJoinAndSelect('s.project_id', 'p')
	// 			.where('p.id = :project_id', {project_id: projectId})
	// 			.andWhere('s.index > :index', {index: section.index})
	// 			.getMany();

	// 		for(let i = 0; i < sections.length; i++){
	// 			await this.repository.update({id: sections[i].id}, {index: sections[i].index - 1});
	// 		}

	// 		await this.repository.delete({id: sectionId});

	// 		return this.repository.find({
	// 			where: {project_id: proj},
	// 			order: {index:'ASC'}
	// 		});	//전부 받아오는 메소드로 변경 with tasks;
	// 	} catch (err) {
	// 		console.log(err);
	// 		return err;
	// 	}
	// }

	// async moveSect(userUuid: string,  projectId: number, sectionId: number, index: number) {
	// 	try {
	// 		const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
	// 		const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
	// 		console.log(isin);
	// 		if (!isin) throw new Error('해당 프로젝트에 유저가 없음');

	// 		const projRepo = getRepository(Projects);

	// 		const proj = await projRepo.findOne({ id: projectId });
	// 		const section = await this.repository.findOne({id: sectionId});

	// 		//8 -> 2, (2~7) +=1
	// 		if (section.index > index) {
	// 			const sections = await this.repository
	// 				.createQueryBuilder('s')
	// 				.leftJoinAndSelect('s.project_id', 'p')
	// 				.where('p.id = :projectId', { projectId: projectId })
	// 				.andWhere('s.index >= :start AND s.index < :end', { start: index, end: section.index })
	// 				.getMany()

	// 			console.log(sections);

	// 			for (let i = 0; i < sections.length; i++) {
	// 				await this.repository.update({ id: sections[i].id }, { index: sections[i].index + 1 });
	// 			}
	// 		} else if (section.index < index) {
	// 			const sections = await this.repository
	// 				.createQueryBuilder('s')
	// 				.leftJoinAndSelect('s.project_id', 'p')
	// 				.where('p.id = :projectId', { projectId: projectId })
	// 				.andWhere('s.index > :start AND s.index <= :end', { start: section.index, end: index })
	// 				.getMany()

	// 			console.log(sections);

	// 			for (let i = 0; i < sections.length; i++) {
	// 				await this.repository.update({ id: sections[i].id }, { index: sections[i].index - 1 });
	// 			}
	// 		}

	// 		await this.repository.update({id: sectionId}, {index: index});

	// 		return this.repository.find({
	// 			where: {project_id: proj},
	// 			order: {index:'ASC'}
	// 		});	//전부 받아오는 메소드로 변경 with tasks;
	// 	} catch (err) {
	// 		console.log(err);
	// 		return err;
	// 	}
	// }
}