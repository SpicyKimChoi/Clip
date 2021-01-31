import { EntityRepository, AbstractRepository, getRepository } from "typeorm";
import { Comments } from "../entity/Comments";
import { Users } from "../entity/Users";
import { Tasks } from "../entity/Tasks";

@EntityRepository(Comments)
export class CommentsRepository extends AbstractRepository<Comments>{
	async addComment(userUuid: string, taskId: number, content: string){
		try {
			const userRepo = getRepository(Users);
			const user = await userRepo.findOne({uuid: userUuid});

			const taskRepo = getRepository(Tasks);
			const task = await taskRepo.findOne({id: taskId});

			const comment = new Comments();
			comment.user_id = user;
			comment.task_id = task;
			comment.content = content;

			return this.repository.save(comment);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async editCommnet(userUuid: string, commnetId: number, content: string){
		try {
			const comment = await this.repository.findOne({
				join:{
					alias: 'cm',
					leftJoinAndSelect:{
						user: 'cm.user_id'
					}
				},
				where:{id: commnetId}
			});
			
			if(comment.user_id.uuid !== userUuid) throw new Error('수정불가');
			console.log(content);
			console.log(comment);
			await this.repository.update({id: commnetId}, {content});
			return ;
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async delComment(userUuid: string, commnetId: number){
		try {
			const comment = await this.repository.findOne({
				join:{
					alias: 'cm',
					leftJoinAndSelect:{
						user: 'cm.user_id'
					}
				},
				where:{id: commnetId}
			});
			
			if(comment.user_id.uuid !== userUuid) throw new Error('삭제불가');

			return this.repository.delete({id: commnetId});
		} catch (err) {
			console.log(err);
			return err;
		}
	}


}