import './App.css'
import { SelectFolder } from './pages'
import { useViewManager } from './hooks'


function App() {
  const {view, changeView} = useViewManager()
  
  const renderView = () => {
    switch (view) {
      case 'SelectFolder':
        return <SelectFolder changeView={changeView}/>
      default:
        return <SelectFolder/>
    }
  }

  return (
    <>
    <main className='flex flex-col justify-center items-center'>{renderView()}</main>
    </>
  )
}

export default App
