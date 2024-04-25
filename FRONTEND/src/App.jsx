import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constants'
import Pocetna from './pages/Pocetna'
import Kupci from './pages/kupci/Kupci'
import KupciDodaj from './pages/kupci/KupciDodaj'
import KupciPromjena from './pages/kupci/KupciPromjena'
import Filmovi from './pages/filmovi/Filmovi'
import FilmoviDodaj from './pages/filmovi/FilmoviDodaj'
import FilmoviPromjena from './pages/filmovi/FilmoviPromjena'
import Rezervacije from './pages/rezrvacije/Rezervacije'
import RezervacijePromjena from './pages/rezrvacije/RezervacijePromjena'
import RezervacijeDodaj from './pages/rezrvacije/RezervacijeDodaj'

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />

        <Route path={RoutesNames.KUPAC_PREGLED} element={<Kupci />} />
        <Route path={RoutesNames.KUPAC_NOVI} element={<KupciDodaj />} />
        <Route path={RoutesNames.KUPAC_PROMJENI} element={<KupciPromjena />} />
        
        <Route path={RoutesNames.FILM_PREGLED} element={<Filmovi />} />
        <Route path={RoutesNames.FILM_NOVI} element={<FilmoviDodaj />} />
        <Route path={RoutesNames.FILM_PROMJENI} element={<FilmoviPromjena />} />
        
        <Route path={RoutesNames.REZERVACIJA_PREGLED} element={<Rezervacije />} />
        <Route path={RoutesNames.REZERVACIJA_NOVI} element={<RezervacijeDodaj />} />
        <Route path={RoutesNames.REZERVACIJA_PROMJENI} element={<RezervacijePromjena />} />
        
      </Routes>
    </>
  )
}

export default App
