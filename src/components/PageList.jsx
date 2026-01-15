

export function PageList({pagesNoteBook, 
                          selectedPageId, 
                          setSelectedPageId, 
                          setShowPage, 
                          showPageList, 
                          setShowPageList, 
                          setShowPageBtns, 
                          setShowTaskBtns
                        }){

    if (!showPageList) return null  
    
    if (pagesNoteBook.length === 0) {
      return (
        <div className="ui-empty">
          <p>No hay páginas todavía</p>
          <p className="ui-empty__hint">
            Crea una página para empezar
          </p>
        </div>
      )
    }
                      
    return (
    <>
     {showPageList && (
      <>
       {pagesNoteBook.length > 0 && (<h2 className="ui-title">Selecciona para ver sus tareas</h2>)}
        <ul className="ui-base ui-base--list">
          {pagesNoteBook.map( page => {
            return (
              <li key={page.id} className="ui-option ui-option-list">

                <div className="ui-option-r-container">
                  <input 
                      id={`page-${page.id}`}
                      type="radio"
                      name="lista"
                      checked={selectedPageId === page.id}
                      onChange={() => setSelectedPageId(page.id)}
                  />

                  <label htmlFor={`page-${page.id}`}>
                    <span className="ui-added__title ui-added--pg">{page.pageTitle}</span> 
                    <p className={`ui-added__priority ${page.pagePriority.toLowerCase()}`}>{page.pagePriority}</p>
                  </label>
                 
                </div>

                <button 
                  type='button' 
                  className="ui-btn ui-btn--primary "
                  onClick={() =>  {
                    setShowPage(true)
                    setShowPageList(false)
                    setShowPageBtns(false)
                    setShowTaskBtns(true)
                  }}
                  disabled={selectedPageId !== page.id}>
                    Abrir
                </button>

              </li> 
            )
          })
          }
        </ul>
      </>
     )} 
    </>
)}

