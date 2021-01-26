import { create } from "./create";
import { getProjects } from "./getProjects";
import { update } from "./update";
import { delPorj } from "./delete";
import { invite } from "./invite";
import { getUsers } from "./getUsers";

export const projectsController = {
	create,
	getProjects,
	update,
	delPorj,
	invite,
	getUsers,
}