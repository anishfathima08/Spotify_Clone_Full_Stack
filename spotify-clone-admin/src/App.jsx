import React from 'react'
import AddSong from './pages/AddSong'
import AddAlbum from './pages/AddAlbum'
import ListSong from './pages/ListSong'
import Navbar from './components/Navbar'
import ListAlbum from './pages/ListAlbum'
import Sidebar from './components/Sidebar'
import 'react-toastify/dist/ReactToastify.css'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export const url = 'https://spotify-clone-backend-7m33.onrender.com'

const App = () => {

  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <Navbar />
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path='/add-song' element={<AddSong />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-song' element={<ListSong />} />
            <Route path='/list-album' element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  )
  
}

export default App
