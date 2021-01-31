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
}