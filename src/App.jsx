import './App.css'
import { SelectFolderPage, PreviewPage, ResultPage } from './pages'
import { useViewManager } from './hooks'
import { useState } from 'react'


function App() {
  const {view, changeView} = useViewManager()
  const [movedFiles, setMovedFiles] = useState([])
  
  const renderView = () => {
    switch (view) {
      case 'SelectFolderPage':
        return <SelectFolderPage changeView={changeView}/>
      case 'PreviewPage':
        return <PreviewPage changeView={changeView} setMovedFiles={setMovedFiles}/>
      case 'ResultPage':
        return <ResultPage changeView={changeView} movedFiles={movedFiles} />
      default:
        return <SelectFolderPage changeView={changeView}/>
    }
  }

  return (
    <>
    <main className='flex flex-col justify-center items-center'>{renderView()}</main>
    </>
  )
}

export default App
