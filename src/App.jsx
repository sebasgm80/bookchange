import { Outlet } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './components';



export const App =() => {

  return (
    <>
      <Header />
      <main >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
