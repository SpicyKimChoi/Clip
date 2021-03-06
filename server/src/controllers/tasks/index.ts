import { createTask } from "./createTask";
import { readOne } from "./readOne";
import { editTask } from "./editTask";
import { addAssignee } from "./addAssignee";
import { delAssignee } from "./delAssignee";
import { addComment } from "./addComment";
import { editCommnet } from "./editCommnet";
import { delComment } from "./delComment";
import { addLabel } from "./addLabel";
import { delLabel } from "./delLabel"
import { changeMark } from "./changeMarkCom";
import { like } from "./like";
import { unlike } from "./unlike";
import { moveInSecion } from "./moveInSeciton";
import { moveOutSecion } from "./moveOutSection";
import { delTask } from "./delTask";
import { getTasksByAssignee } from "./getTasksByAssignee";
export const tasksController = {
	createTask,
	readOne,
	editTask,
	addAssignee,
	delAssignee,
	addComment,
	editCommnet,
	delComment,
	addLabel,
	delLabel,
	changeMark,
	like,
	unlike,
	moveInSecion,
	moveOutSecion,
	delTask,
	getTasksByAssignee,
}