import Image from "next/image"
import { img_500 } from "../requests"

const MovieRow = ({movie,title}) => {
   
  return (
    <div className="flex flex-col h-80">
    <h2 className="text-white text-2xl">{title}</h2>
    <div className="text-white w-full h-80 flex overflow-x-scroll overflow-y-hidden scrollbar-hide space-x-2 md:space-x-4">
        
        {movie.map((mov)=><div className="flex items-center" key={mov.id}>  
            <div className="relative z-10  w-40 h-60  flex items-center ">
                <Image src={`${img_500}/${mov.poster_path || mov.backdrop_path}`} alt={mov.title || mov.original_title} fill className="rounded-2xl object-fill md:hover:scale-105 duration-300"/>
            </div>
            </div>
        )}  
    </div>
    </div>
  )
}

export default MovieRow