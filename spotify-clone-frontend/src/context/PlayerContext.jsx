import axios from 'axios'
import { createContext, useRef, useState, useEffect } from "react"

export const PlayerContext = createContext()

const PlayerContextProvider = (props) => {

    const url = 'https://spotify-clone-backend-7m33.onrender.com'

    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const [songsData, setSongsData] = useState([])
    const [albumsData, setAlbumsData] = useState([])
    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [isMuted, setIsMuted] = useState(false)

    const handleVolumeChange = (e) => {
        const vol = parseFloat(e.target.value)
        setVolume(vol)
        console.log('vol', vol)
        if (audioRef.current) {
            audioRef.current.volume = vol
        }
    }

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (!isMuted) {
            audioRef.current.volume = 0
            setVolume(0)
        } else {
            audioRef.current.volume = 0.5
            setVolume(0.5)
        }
    }

    const [time, setTime] = useState({
        currentTime: {
            minute: 0,
            second: 0
        },
        totalTime: {
            minute: 0,
            second: 0
        }
    })

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),  
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioRef])

    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    const playWithId = async (id) =>{
        await songsData.map((item) => {
            if (id === item._id) {
                setTrack(item)
            }
        })
        await audioRef.current.play()
        setPlayStatus(true)
    }

    const previousSong = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index - 1])
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
    }

    const nextSong = async () => {
        songsData.map(async (item, index) => {
            if (track._id === item._id && index < songsData.length - 1) {
                await setTrack(songsData[index + 1])
                await audioRef.current.play()
                setPlayStatus(true)
            }
        })
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`)
            setSongsData(response.data.songs)
            setTrack(response.data.songs[0])
        } catch (error) {
            console.log('error getSongsData', error)
        }
    }


    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`)
            setAlbumsData(response.data.albums)
        } catch (error) {
            console.log('error getAlbumsData', error)
        }
    }

    useEffect(() => {
        getAlbumsData()
        getSongsData()
    }, [])

    const [ searchInput , setSearchInput ] = useState("")
    const [ filteredData , setFilteredData ] = useState([])
    
    const SearchSong = (e) => {
        const value = e.target.value;
        setSearchInput(value);
    
            if (value.trim() === "") {
                setFilteredData([]); 
            } else {
                setFilteredData(
                songsData.filter((a) =>
                    a.name.toLowerCase().includes(value.toLowerCase())
                )
                )
        }
    }

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previousSong, nextSong,
        seekSong,
        songsData, albumsData,
        volume, handleVolumeChange,
        isMuted, toggleMute,
        SearchSong, filteredData
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
 
}

export default PlayerContextProvider
