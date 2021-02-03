import { EntityRepository, AbstractRepository, getRepository } from "typeorm";
import { Users } from "../entity/Users";
import { Tasks } from "../entity/Tasks";
import { Likes } from "../entity/Likes";

@EntityRepository(Likes)
export class LikesRepository extends AbstractRepository<Likes>{
	async like(userUuid: string, taskId: number){
		try {
			const userRepo = getRepository(Users);
			const taskRepo = getRepository(Tasks);

			const user = await userRepo.findOne({uuid: userUuid});
			const task = await taskRepo.findOne({id: taskId});

			const isLiked = await this.repository.find({user_id: user, task_id:task});
			if(isLiked.length !== 0) throw new Error('Already Exist');

			const like = new Likes();
			like.user_id = user;
			like.task_id = task;

			return this.repository.save(like);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async unlike(userUuid: string, taskId: number){
		try {
			const userRepo = getRepository(Users);
			const taskRepo = getRepository(Tasks);

			const user = await userRepo.findOne({uuid: userUuid});
			const task = await taskRepo.findOne({id: taskId});

			const isLiked = await this.repository.find({user_id: user, task_id:task});
			if(isLiked.length === 0) throw new Error('Does not Exist');

			return this.repository.delete({user_id: user, task_id: task});
		} catch (err) {
			console.log(err);
			return err;
		}
	}
}