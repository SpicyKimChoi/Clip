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

interface tasksParams {
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
			const section = await sectionRepo.findOne({ id: sectionId });

			const obj = await this.repository.findAndCount({ section_id: section });
			const num = obj[1];
			console.log(obj);

			return num || 0;

		} catch (err) {
			console.log(err);
			return err;
		}
	}
	async addLabel(taskId: number, labelId: number) {
		try {
			const taskLabelRepo = getRepository(TaskLabel);
			const taskLabel = new TaskLabel();

			const labelRepo = getRepository(Labels);
			const label = await labelRepo.findOne({ id: labelId });
			const task = await this.repository.findOne({ id: taskId });

			const isExist = await taskLabelRepo.find({ label_id: label, task_id: task });
			if (isExist.length !== 0) throw new Error('Already Exists');

			taskLabel.label_id = label;
			taskLabel.task_id = task;

			return taskLabelRepo.save(taskLabel);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async delLabel(taskId: number, labelId: number) {
		try {
			const taskLabelRepo = getRepository(TaskLabel);

			const labelRepo = getRepository(Labels);
			const label = await labelRepo.findOne({ id: labelId });
			const task = await this.repository.findOne({ id: taskId });

			const isExist = await taskLabelRepo.find({ label_id: label, task_id: task });
			if (isExist.length === 0) throw new Error('Does not Exists');

			return taskLabelRepo.delete({ task_id: task, label_id: label });
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async addAssignee(taskId: number, email: string) {
		try {
			const assigneeRepo = getRepository(Assignee);
			const assignee = new Assignee();

			const userRepo = getRepository(Users);
			const user = await userRepo.findOne({ email });
			const task = await this.repository.findOne({ id: taskId });

			const isExist = await assigneeRepo.find({ user_id: user, task_id: task });
			if (isExist.length !== 0) throw new Error('Already Exists');

			assignee.user_id = user;
			assignee.task_id = task;

			return assigneeRepo.save(assignee);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async delAssignee(taskId: number, email: string) {
		try {
			const assigneeRepo = getRepository(Assignee);

			const userRepo = getRepository(Users);
			const user = await userRepo.findOne({ email });
			const task = await this.repository.findOne({ id: taskId });

			const isExist = await assigneeRepo.find({ user_id: user, task_id: task });
			if (isExist.length === 0) throw new Error('Does not Exists');

			return assigneeRepo.delete({ user_id: user, task_id: task });

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async createTask(userUuid: string, projectId: number, sectionId: number, labelIds: number[], tasksParams: tasksParams) {
		try {
			const ppRepo = getCustomRepository(ProjectsPermissionsRepository);
			const isin = await ppRepo.isUserInsideProj(userUuid, projectId);
			console.log(isin);
			if (!isin) throw new Error('해당 프로젝트에 유저가 없음');

			const sectionRepo = getRepository(Sections);
			const section = await sectionRepo.findOne({ id: sectionId });

			const task = new Tasks();
			task.title = tasksParams.title;
			task.section_id = section;
			task.section_index = await this.getLastIdx(sectionId) + 1;
			task.description = tasksParams.description;
			task.start_date = tasksParams.start_date;
			task.due_date = tasksParams.due_date;

			const curTask = await this.repository.save(task);

			//라벨 추가
			for (let i = 0; i < labelIds.length; i++) {
				await this.addLabel(curTask.id, labelIds[i]);
			}

			//어사이니추가
			for (let i = 0; i < labelIds.length; i++) {
				await this.addAssignee(curTask.id, tasksParams.assignee[i]);
			}

			return curTask
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async readOne(taskId: number) {
		try {

			const task = await this.repository
				.createQueryBuilder('t')
				.leftJoinAndSelect('t.section_id', 's')
				.leftJoinAndSelect('t.label', 'lab')
				.leftJoinAndSelect('t.assignee', 'a')
				.leftJoinAndSelect('t.like', 'l')
				.leftJoinAndSelect('t.comment', 'c')
				.leftJoinAndSelect('lab.label_id', 'labe')
				.leftJoinAndSelect('a.user_id', 'au')
				.leftJoinAndSelect('l.user_id', 'lu')
				.leftJoinAndSelect('c.user_id', 'cu')
				.where('t.id = :taskId', { taskId })
				.getOne()

			return task;
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async editTask(taskId: number, title: string, description: string, start_date: Date, due_date: Date) {
		try {
			const task = await this.repository.findOne({ id: taskId });
			title = title || task.title;
			description = description || task.description;
			start_date = start_date || task.start_date;
			due_date = due_date || task.due_date;

			await this.repository.update({ id: taskId }, { title, description, start_date, due_date });

			return await this.readOne(taskId);

		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async changeMarkComplete(taskId: number) {
		try {
			const task = await this.repository.findOne({ id: taskId });
			return this.repository.update({ id: taskId }, { is_completed: !task.is_completed });
		} catch (err) {
			console.log(err);
			return err;
		}
	}


	async getAllTasksByAssignee(projectId: number, userUuid: string){
		try {
			
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async getAllTasksByLike(projectId: number, userUuid: string){
		try {
			
		} catch (err) {
			console.log(err);
			return err;
		}
	}


	async moveInSect(userUuid: string, sectionId: number, taskId: number, index: number) {
		try {

			const sectionRepo = getRepository(Sections);

			const section = await sectionRepo.findOne({ id: sectionId });
			const task = await this.repository.findOne({ id: taskId });

			//8 -> 2, (2~7) +=1
			if (task.section_index > index) {
				const tasks = await this.repository
					.createQueryBuilder('t')
					.leftJoinAndSelect('t.section_id', 's')
					.where('s.id = :sectionId', { sectionId: sectionId })
					.andWhere('t.section_index >= :start AND t.section_index < :end', { start: index, end: task.section_index })
					.getMany()

				console.log(tasks);

				for (let i = 0; i < tasks.length; i++) {
					await this.repository.update({ id: tasks[i].id }, { section_index: tasks[i].section_index + 1 });
				}
			} else if (task.section_index < index) {
				const tasks = await this.repository
					.createQueryBuilder('t')
					.leftJoinAndSelect('t.section_id', 's')
					.where('s.id = :sectionId', { sectionId: sectionId })
					.andWhere('t.section_index > :start AND t.section_index <= :end', { start: task.section_index, end: index })
					.getMany()

				console.log(tasks);

				for (let i = 0; i < tasks.length; i++) {
					await this.repository.update({ id: tasks[i].id }, { section_index: tasks[i].section_index - 1 });
				}
			}

			await this.repository.update({ id: sectionId }, { section_index: index });

			
		} catch (err) {
			console.log(err);
			return err;
		}
	}


}