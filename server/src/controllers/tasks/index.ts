import { createTask } from "./createTask";
import { readOne } from "./readOne";
import { editTask } from "./editTask";
import { addAssignee } from "./addAssignee";
import { delAssignee } from "./delAssignee";
import { addComment } from "./addComment";
import { editCommnet } from "./editCommnet";
import { delComment } from "./delComment";

export const tasksController = {
	createTask,
	readOne,
	editTask,
	addAssignee,
	delAssignee,
	addComment,
	editCommnet,
	delComment
}