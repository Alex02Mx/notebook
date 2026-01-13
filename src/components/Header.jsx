import logo from "../assets/logo.png"
import addPage from '../assets/add-page.png'
import editPage from '../assets/edit-page.png'
import deletePage from '../assets/delete-page.png'

import homePage from '../assets/home.png'
import addTask from '../assets/add-task.png'

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
                        setConfirmDelete 
                      }){
   return (
    <>
    <div className="header">

      <div className="header__logo">
          <img src = {logo} alt="Logo"></img>
      </div>

      <div className="header__actions">

        <div>
          {showTaskBtns && (
          <>
          <button className="header-btn header-btn--square" 
                  onClick = { () => {
                    setShowPage(false)
                    setShowPageList(true)
                    setShowPageBtns(true)
                    setShowTaskBtns(false)
                    setSelectedPageId(null)
                  }}
                  >
              <img  
                className="header-btn__icon"
                src={homePage} 
                alt="Home"
              />
          </button>

          <button className="header-btn header-btn--square" 
                  onClick = { () => {
                      setShowNewFormTask(true)
                  }}
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

        <div>
          {showPageBtns && (
          <>

          <button className="header-btn header-btn--square" 
                  onClick={ () => { 
                      setShowEditForm(false)
                      setShowNewForm(true)
                      setSelectedPageId(null)
                  }
                  }>
              <img 
                className="header-btn__icon" 
                src={addPage} 
                alt="Agregar Pagina"
              />
          </button>

          <button className="header-btn header-btn--square" 
                  disabled={selectedPageId === null}
                  onClick = { () => {
                      setShowEditForm(true)
                  }}
                  >
              <img  
                className="header-btn__icon"
                src={editPage} 
                alt="Editar Pagina"
              />
          </button>

          <button className="header-btn header-btn--square" 
                  disabled={selectedPageId === null}
                  onClick = { () => {
                    setConfirmDelete({
                        open: true,
                        type: "page",
                        id: selectedPageId,
                          })
                  }}>
              <img
                className ="header-btn__icon"  
                src= {deletePage} 
                alt="Borrar Pagina"
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





