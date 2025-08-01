import Header from '../header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'

function Layout() {
  return (
    <div>
      <Header/>
      <main>
        <Outlet/>
      </main>
      <div className='mt-62'>
        <Footer/>
      </div>
    </div>
  )
}

export default Layout
