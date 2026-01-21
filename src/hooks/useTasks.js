import { useEffect, useState } from "react"
import { deleteTask } from "../logic/taskActions"

export function useTasks(showFeedback){
    const [taskList, setTaskList] = useState (() => {
        try {
            const item = localStorage.getItem("TASKS")
            return item ? JASON.parse(item) : []
        }
        catch{
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem("TASKS", JSON.stringify(taskList))
    },[taskList])

    function removeTask({ taskId, setSelectedTaskId}){
        deleteTask({
            taskId,
            setTaskList,
            setSelectedTaskId,
            showFeedback,
        })
    }
    return {
        taskList,
        setTaskList,
        removeTask,
    }
}