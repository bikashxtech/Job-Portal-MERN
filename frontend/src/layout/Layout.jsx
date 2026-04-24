import { AuthProvider } from '../context/AuthContext.jsx'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <AuthProvider>
            <div className='d-flex flex-column'>
                <Navbar />
                <main className='flex-grow-1'>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </AuthProvider>
    )
}

export default Layout;