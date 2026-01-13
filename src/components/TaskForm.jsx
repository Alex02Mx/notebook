import { useEffect, useState } from 'react'

export function TaskForm( {setTaskList, 
                           selectedPageId,
                           setShowNewFormTask,
                           setShowEditFormTask,
                           taskList,
                           taskMode,
                           selectedTaskId
                          }){

    const isEditTaskMode = taskMode === "edit"                         

    const [taskTitle, setTaskTitle] = useState("")
  
    const taskToEdit = isEditTaskMode 
        ? taskList.find( task => task.id === selectedTaskId)
        : null                     

   useEffect( () => {
    if(taskToEdit){
      setTaskTitle(taskToEdit.taskTitle)
    }

   },[taskToEdit] )                         


  function handleSubmit(e){
    e.preventDefault()
    if(!taskTitle) return

    isEditTaskMode ? updateTask() : createTask()

    resetTaskAndClose()
  }

  function createTask() {
    const newTask = {
      id: crypto.randomUUID(),
      pageId: selectedPageId,
      taskTitle: taskTitle,
      status: false
    }
    
    setTaskList( list => [ ...list, newTask ])
  }

  function updateTask(){
    setTaskList( list => 
    list.map( task => 
        task.id === selectedTaskId  
        ? {...task, taskTitle: taskTitle}
        : task
      ))
  }

  
  function resetTaskAndClose(){
    setShowEditFormTask(false)
    setShowNewFormTask(false)
    setTaskTitle("")
  }

  return (
        <div className="ui-overlay">
          <form  onSubmit={handleSubmit} className="ui-base ui-base--form">
          <h2 className="ui-title">
            {isEditTaskMode ? "Editar Tarea" : "Nueva Tarea"}
          </h2>

          <div className="ui-form__group">
            <label htmlFor='task-title' className="ui-form__label"> Titulo : </label>
            <input 
                  type="text"
                  value={taskTitle}
                  className="ui-form__input" 
                  id="task-title"
                  onChange={e => setTaskTitle(e.target.value)
                  }
            />
          </div>

          <div className="ui-form__actions">

            <button type="submit" 
              className="ui-btn ui-btn--primary"
              disabled={!taskTitle}
            >
                {isEditTaskMode ? "Guardar Cambios" : "Crear Tarea"}
            </button>

            <button type="button" 
                  className="ui-btn ui-btn--secondary"
                  onClick={() => {
                    resetTaskAndClose()
                  }}
            >
              Cancelar
            </button>
          </div>
                 
        </form>
        </div>
    )
}