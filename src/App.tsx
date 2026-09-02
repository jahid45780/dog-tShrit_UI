
import { Outlet } from 'react-router-dom'
import './App.css'
import CommonLayout from './components/Layout/ComonLayout'

function App() {


  return (
    <>
      <CommonLayout>
      <Outlet/>
     </CommonLayout>
    </>
  )
}

export default App
