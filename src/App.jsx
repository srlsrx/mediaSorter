import './App.css'
import { SelectFolderPage, PreviewPage, ResultPage } from './pages'
import { useViewManager } from './hooks'


function App() {
  const {view, changeView} = useViewManager()
  
  const renderView = () => {
    switch (view) {
      case 'SelectFolderPage':
        return <SelectFolderPage changeView={changeView}/>
      case 'PreviewPage':
        return <PreviewPage changeView={changeView}/>
      case 'ResultPage':
        return <ResultPage changeView={changeView}/>
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
