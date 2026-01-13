

export function PageList({pagesNoteBook, 
                          selectedPageId, 
                          setSelectedPageId, 
                          setShowPage, 
                          showPageList, 
                          setShowPageList, 
                          setShowPageBtns, 
                          setShowTaskBtns
                        }){
    return (
    <>
     {showPageList && (
      <>
       {pagesNoteBook.length === 0 && (<h2 className="ui-title">Notebook vacio</h2>)}
       {pagesNoteBook.length > 0 && (<h2 className="ui-title">Paginas en NoteBook</h2>)}
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

