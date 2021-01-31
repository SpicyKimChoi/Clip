import { createTask } from "./createTask";
import { readOne } from "./readOne";
import { editTask } from "./editTask";
import { addAssignee } from "./addAssignee";
import { delAssignee } from "./delAssignee";

export const tasksController = {
	createTask,
	readOne,
	editTask,
	addAssignee,
	delAssignee,
}