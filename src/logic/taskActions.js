export function deleteTask({
    taskId,
    setTaskList,
    setSelectedTaskId,
    showFeedback,
}) {
    setTaskList(tasks => tasks.filter( task => task.id !== taskId))
    setSelectedTaskId(null)
    showFeedback('success', 'Tarea eliminada correctamente')
  }