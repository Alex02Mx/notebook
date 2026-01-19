import logo from "../../assets/logo.png"
import addPage from '../../assets/add-page.png'
import editPage from '../../assets/edit-page.png'
import deletePage from '../../assets/delete-page2.png'

import homePage from '../../assets/home.png'
import addTask from '../../assets/add-task.png'

export function Header({setShowPageBtns,
                        setShowTaskBtns,
                        setShowNewForm,
                        setShowEditForm, 
                        setShowNewFormTask,
                        setShowPageList, 
                        setSelectedPageId,
                        setShowPage,
                        selectedPageId, 
                        showPageBtns, 
                        showTaskBtns,
                        setConfirmDelete,
                        guardAction,
                      }){
  return (
  <>
  <div className="header">
    <div className="header__logo">
        <img src = {logo} alt="Logo"></img>
    </div>
    <div className="header__actions">
      <div className="header__pack">
        {showPageBtns && (
          <>
          <button className="ui-btn-sqr ui-btn-sqr--header" 
                  onClick={ () => { 
                      setShowEditForm(false)
                      setShowNewForm(true)
                      setSelectedPageId(null)
                  }}
                  title="Agregar pagina"
                  aria-label="Agregar pagina"
                  >
              <img 
                className="header-btn__icon" 
                src={addPage} 
                alt="Agregar Pagina"
              />
          </button>
          <button className="ui-btn-sqr ui-btn-sqr--header" 
                  disabled={selectedPageId === null}
                  onClick = { () => {
                      setShowEditForm(true)
                  }}
                  title="Editar pagina"
                  aria-label="Editar pagina"
                  >
              <img  
                className="header-btn__icon"
                src={editPage} 
                alt="Editar Pagina"
              />
          </button>
          <button className="ui-btn-sqr ui-btn-sqr--task ui-btn-sqr--danger" 
                  disabled={selectedPageId === null}
                  onClick = { () => 
                     guardAction({
                      type : "page",
                      action : "delete",
                      id : selectedPageId,
                      onSuccess : () => 
                        setConfirmDelete({
                          open : true,
                          type : "page",
                          id : selectedPageId
                        })
                     })
                  }
                  title="Borrar pagina"
                  aria-label="Borrar pagina"
                  >
              <img
                className ="header-btn__icon"  
                src= {deletePage} 
                alt="Borrar Pagina"
              />
          </button>
          </>
        )}
      </div>
      <div className="header__pack">
        {showTaskBtns && (
          <>
          <button className="ui-btn-sqr ui-btn-sqr--header" 
                  onClick = { () => {
                    setShowPage(false)
                    setShowPageList(true)
                    setShowPageBtns(true)
                    setShowTaskBtns(false)
                    setSelectedPageId(null)
                  }}
                  title="Home"
                  aria-label="Home"
                  >
              <img  
                className="header-btn__icon"
                src={homePage} 
                alt="Home"
              />
          </button>
          <button className="ui-btn-sqr ui-btn-sqr--header" 
                  onClick = { () => {
                      setShowNewFormTask(true)
                  }}
                  title="Agregar tarea"
                  aria-label="Agregar tarea"
                  >
              <img  
                className="header-btn__icon"
                src={addTask} 
                alt="Agregar Tarea"
              />
          </button>
          </>
        )}
      </div>
    </div>
  </div>  
  </>
  )
}





