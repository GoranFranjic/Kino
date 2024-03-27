import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import Kupci from './pages/kupci/Kupci'
import KupciDodaj from './pages/kupci/KupciDodaj'

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.KUPAC_PREGLED} element={<Kupci />} />
        <Route path={RoutesNames.KUPAC_NOVI} element={<KupciDodaj />} />
        
      </Routes>
    </>
  )
}

export default App
