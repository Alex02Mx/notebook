export function deletePage({
    pageId,
    setPagesNoteBook,
    setTaskList,
    setSelectedPageId,
    showFeedback,
}) {
    setPagesNoteBook(pages => pages.filter( page => page.id !== pageId))
    setTaskList(tasks => tasks.filter( task => task.pageId !== pageId))
    setSelectedPageId(null)
    showFeedback('success', 'Página eliminada correctamente')
  }