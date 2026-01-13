import editTask from '../assets/pencil.png'
import deleteTask from '../assets/Xdelete2.png'

export function TaskList({showPage, 
                        pagesNoteBook, 
                        selectedPageId,
                        taskList, 
                        setTaskList, 
                        setShowEditFormTask,
                        setSelectedTaskId,
                        setConfirmDelete
                        }){

  const selectedTitle = pagesNoteBook.find( item => item.id === selectedPageId)
  const pageTask = taskList.filter( task => task.pageId === selectedPageId)

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
        <div className="title-priority">
          <h2 className="ui-title">{selectedTitle.pageTitle}</h2>
          <h2 className="priority-title">{`Prioridad :  ${selectedTitle.pagePriority} `}</h2>
        </div>


        {pageTask.length == 0 && <h3 className="ui-title">Sin Tareas</h3>} 
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
                <span className="ui-added__title ui-added--tk">{task.taskTitle}</span>
              </label>
            </div>


            <div className="ui-btns-container">
              <button className="header-btn header-btn--square" 
                        onClick = { () => {
                            setSelectedTaskId(task.id)
                            setShowEditFormTask(true)
                        }}
                        >
                    <img  
                      className="task-btn__icon"
                      src={editTask} 
                      alt="Editar Tarea"
                    />
              </button>

              <button className="header-btng header-btn--square task-delete" 
                        disabled={!task.status}
                        onClick = { () => {
                          setConfirmDelete({
                            open: true,
                            type: "task",
                            id: task.id,
                          })

                        }}
                        >
                    <img  
                      className="task-btn__icon"
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