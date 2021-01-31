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

	async addAssignee(taskId: number, email: string){
		try {
			const assigneeRepo = getRepository(Assignee);
			const assignee = new Assignee();

			const userRepo = getRepository(Users);
			const user = await userRepo.findOne({email});
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

	async readOne(taskId: string){
		try {
			// const task = await this.repository.find({
			// 	join:{
			// 		alias: 'l',
			// 		leftJoinAndSelect:{
			// 			section: "l.section_id",
			// 			labels: "l.label",
			// 			assignees: "l.assignee",
			// 			likes: "l.like",
			// 			comments: "l.comment"
			// 		}
			// 	},
			// 	where:{
			// 		id: taskId
			// 	}
			// });

			const task = await this.repository
				.createQueryBuilder('t')
				.leftJoinAndSelect('t.section_id', 's')
				.leftJoinAndSelect('t.label', 'lab')
				.leftJoinAndSelect('t.assignee', 'a')
				.leftJoinAndSelect('t.like', 'l')
				.leftJoinAndSelect('t.comment', 'c')
				.leftJoinAndSelect('lab.label_id','labe')
				.leftJoinAndSelect('a.user_id', 'au')
				.leftJoinAndSelect('l.user_id', 'lu')
				.where('t.id = :taskId', {taskId})
				.getOne()

			return task;
		} catch (err) {
			console.log(err);
			return err;
		}
	}
}