import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { API_KEY } from '../requests'

const Modal = ({setOpen,open,movie}) => {
    const[movVideo,setMovVideo] = useState('')
    
    useEffect(()=>{
        async function getVideoTrailer(){
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`)
            const data = await res.json()
            
            return setMovVideo(data.results[0]?.key)
        }
        getVideoTrailer()
    },[movie.id])

  return (
    <div className='absolute z-30 top-0 left-0 w-full min-h-screen'>
        <div className='flex flex-col w-full h-screen items-center justify-center space-y-10'>
            <div className='flex flex-col z-40 space-y-4 w-3/4 h-2/3 lg:h-3/4 bg-slate-900 pb-10  rounded-2xl'>
                <button onClick={()=>setOpen(!open)} className="bg-gray-500 py-2 px-6 rounded-xl flex self-end">Close</button>
                <div className='w-full h-full'>
            <ReactPlayer 
                url={`https://www.youtube.com/watch?v=${movVideo}`}
                width='100%'
                height='100%' 
                controls={true}
            />
            </div>
            <div className='flex space-x-4 m-4'>
                <button className="bg-rose-700 py-2 px-6 rounded-xl">Play</button>
                <button className="bg-gray-500 py-2 px-6 rounded-xl">More info</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Modal