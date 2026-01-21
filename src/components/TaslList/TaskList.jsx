import editTask from '../../assets/pencil.png'
import deleteTask from '../../assets/Xdelete2.png'

import { useAppUI } from "../../context/AppUIContext"

export function TaskList({
                          pagesNoteBook, 
                          taskList, 
                          setTaskList, 
                          handleGuardAction,
                        }){

  const { 
      showPage, 
      setShowEditFormTask,
      setSelectedTaskId,
      setShowNewFormTask,
      setConfirmDelete,
      selectedPageId,
      } = useAppUI()

  if(!showPage) return null
  
  const selectedTitle = pagesNoteBook.find( item => item.id === selectedPageId)
  const pageTask = taskList.filter( task => task.pageId === selectedPageId)

  if (pageTask.length === 0){
    return (
      <div className="ui-empty">
        <p>No hay tareas en esta página</p>
        <p className="ui-empty__hint">
          Agrega una tarea para comenzar
        </p>
        <button className='ui-btn ui-btn--ghost'
          onClick={ () => setShowNewFormTask(true)}
        >
          Agregar tarea
        </button>
      </div>
    )
  }

  function toggleTaskList(id, complete){
    setTaskList( currentList => currentList.map( item => {
      if(item.id === id){
        return {
          ...item,
          status: complete
        }
      }
      return item
    }))
  }

  return (
  <>
    {showPage && (
      <div>
        <>
        <div className="ui-list__header">
          <h2 className="ui-list__title">{selectedTitle.pageTitle}</h2>
          <h2 className="ui-list__meta">Prioridad : 
              <p className= {`ui-added__priority--${selectedTitle.pagePriority.toLowerCase()}`} >
                {selectedTitle.pagePriority}
              </p> 
          </h2>
        </div>
        <ul className="ui-base ui-base--list">
        {pageTask.map( task => {
          return (
          <li key={task.id} className="ui-option ui-option-list">
            <div className="ui-option-container">
              <input
                id={`task-${task.id}`}
                type="checkbox"
                checked={task.status}
                onChange={ e => { 
                    toggleTaskList(task.id, e.target.checked)
                }}
              />

              <label htmlFor={`task-${task.id}`}>
                <span className="ui-added__title ui-added__title--task">{task.taskTitle}</span>
              </label>
            </div>

            <div className="ui-btns-container">
              <button className="ui-btn-sqr ui-btn-sqr--header" 
                        onClick = { () => {
                            setSelectedTaskId(task.id)
                            setShowEditFormTask(true)
                        }}
                        >
                    <img  
                      className="ui-btn__icon--sm"
                      src={editTask} 
                      alt="Editar Tarea"
                    />
              </button>

              <button className="ui-btn-sqr ui-btn-sqr--task" 
                        disabled={!task.status}
                        onClick = { () => 
                          handleGuardAction({
                            type : "task",
                            action : "delete",
                            id : task.id,
                            onSuccess : () =>
                              setConfirmDelete({
                                open : true,
                                type : "task",
                                id : task.id
                              })
                          })
                        }
                        >
                    <img  
                      className="ui-btn__icon--sm"
                      src={deleteTask} 
                      alt="Borrar Tarea"
                    />
              </button>
            </div>

          </li>
          )
        })
        }
        </ul> 

        </>  
      </div>
    )}
  </>
  )
}