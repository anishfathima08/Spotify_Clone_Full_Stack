import { useContext, useEffect, useState, React } from 'react'
import Navbar from './Navbar'
import { assets } from '../assets/assets'
import { useParams } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'


const DisplayAlbum = ( {album} ) => {

    const { id } = useParams();    
    const [albumData, setAlbumData] = useState("")
    const { playWithId, albumsData, songsData } = useContext(PlayerContext)

    useEffect(() => {
        albumsData.map((item) => {
            if (item._id === id) {
                setAlbumData(item);
            }
        });
    }, [albumsData, id]);
    
    return albumData ? (
        <>
            <Navbar/>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className='w-48 rounded' src={albumData.image} alt="" />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <p className="mt-4">
                        <img className='inline-block w-5 mr-2' src={assets.spotify_logo} alt="spotify_logo" />
                        <b className='mr-2'>Spotify</b>
                        <span> • 1,323,154 likes</span>
                        <b> • 50 songs </b>
                        <span>- about 2 hr 30 min.</span>
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="clock_icon" />
            </div>
            <hr />
            {
                songsData.filter((item) => item.album === album.name).map((item,index) => (
                    <div onClick={()=>playWithId(item._id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-3 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                        <p className="text-white">
                            <b className='mr-4 text-[#a7a7a7]'>{index+1}</b>
                            <img className='inline-block w-10 mr-5' src={item.image} alt=""/>
                            {item.name}
                        </p>
                        <p className='text-[15px]'>{albumData.name}</p>
                        <p className='text-[15px] hidden sm:block'>5 days ago</p>
                        <p className='text-[15px] text-center'>{item.duration}</p>
                    </div>
                ))
            }
        </>
    ) : null

}

export default DisplayAlbum
