import { useEffect, useState } from "react";
import { deletePage } from "../logic/pageActions";

export function usePages(showFeedback){
    const [pagesNoteBook, setPagesNoteBook] = useState (() => {
        try {
            const item = localStorage.getItem("PAGES")
            return item ? JSON.parse(item) : []
        }
        catch{
            return []
        }
    })
    useEffect (() =>{
        localStorage.setItem("PAGES", JSON.stringify(pagesNoteBook))
    },[pagesNoteBook] )

    function removePage({pageId, setTaskList, setSelectedPageId }){
        deletePage({
            pageId,
            setPagesNoteBook,
            setTaskList,
            setSelectedPageId,
            showFeedback,
        })
    }
    return {
        pagesNoteBook,
        setPagesNoteBook,
        removePage,
    }
}