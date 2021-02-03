import { EntityRepository, AbstractRepository, getRepository } from "typeorm";
import { Labels } from "../entity/Labels";
import { Projects } from "../entity/Projects";

@EntityRepository(Labels)
export class LabelRepository extends AbstractRepository<Labels>{
	async create(name: string, color: string, projectId: number){
		try {
			console.log(" ===== ");
			const projRepo = getRepository(Projects);
			const proj = await projRepo.findOne({id:projectId});

			const label = new Labels();
			label.name = name;
			label.color = color;
			label.project_id = proj;

			return this.repository.save(label);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async readAll (projectId: number){
		try {
			const projRepo = getRepository(Projects);
			const proj = await projRepo.findOne({id:projectId});

			return this.repository.find({project_id: proj});
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async edit (labelId: number, name: string, color: string){
		try {
			// const label = await this.repository.findOne({id: labelId});
			const label = await this.repository
				.createQueryBuilder('l')
				.leftJoinAndSelect('l.project_id','p')
				.where('l.id = :id', {id: labelId})
				.getOne();
			console.log(label);

			const proj = label.project_id.id;
			name = name || label.name;
			color = color || label.color;

			await this.repository.update({id: labelId}, {name , color});
			return await this.readAll(proj);
		} catch (err) {
			console.log(err);
			return err;
		}
	}

	async del (labelId: number){
		try {
			const label = await this.repository
				.createQueryBuilder('l')
				.leftJoinAndSelect('l.project_id','p')
				.where('l.id = :id', {id: labelId})
				.getOne();
			const proj = label.project_id.id;

			await this.repository.delete({id: labelId});
			return await this.readAll(proj);
		} catch (err) {
			console.log(err);
			return err;
		}
	}
}