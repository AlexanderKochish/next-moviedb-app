import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { API_KEY } from '../requests'
import { MdOutlineClose,MdInfoOutline } from 'react-icons/md'
import { FaPlay } from 'react-icons/fa'

const Modal = ({setOpen,open,movie}) => {
    const[movVideo,setMovVideo] = useState('')
    const[play,setPlay] = useState(false)
    useEffect(()=>{
        async function getVideoTrailer(){
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
            const data = await res.json()
            
            return setMovVideo(data.results[0]?.key)
        }
        getVideoTrailer()
    },[movie.id])

  return (
    <div className='absolute flex flex-col items-center justify-center bg-black/70 z-30 top-0 left-0 w-full min-h-screen'>
        <div className='relative flex flex-col w-full h-screen items-center justify-center space-y-4'>
            <div className='flex flex-col z-40 w-3/4 h-2/3 lg:h-3/4 bg-black pb-10  rounded-2xl'>
                <MdOutlineClose onClick={()=>setOpen(!open)} className="cursor-pointer m-2 hover:animate-pulse w-10 h-10 text-white flex self-end"/>
                <div className='w-full h-full'>
            <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${movVideo}`}
                width='100%'
                height='100%' 
                controls={true}
                playing={play}
            />
            </div>
            <div className='flex space-x-4 m-4'>
                <button onClick={()=>setPlay(!play)} className="bg-rose-700 py-2 px-6 rounded-xl inline-flex items-center"><FaPlay className="mr-2"/>Play</button>
                <button className="bg-gray-500 py-2 px-6 rounded-xl inline-flex items-center"><MdInfoOutline className="mr-2"/>More info</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Modal