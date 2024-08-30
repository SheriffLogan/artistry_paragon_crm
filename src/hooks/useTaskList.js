import { useState } from 'react';
import { todayTasks, upcomingTasks, otherTasks } from '../pages/apps/Tasks/TasksList/data';

export default function useTaskList() {
	const [todayTask] = useState([...todayTasks]);
	const [upcomingTask] = useState([...upcomingTasks]);
	const [otherTask] = useState([...otherTasks]);
	const [selectedTask, setSelectedTask] = useState(todayTasks[0]);

	/**
	 * Selects the task
	 * @param {object} task
	 */
	const selectTask = (task) => {
		setSelectedTask(task);
	};

	return {
		todayTask,
		upcomingTask,
		otherTask,
		selectedTask,
		selectTask,
	};
}
