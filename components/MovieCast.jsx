import Image from "next/image"
import { img_300 } from "../requests"
import EmptyImage from '../public/user-icon.png'

const MovieCast = ({cast}) => {

  return (
    <div className="flex flex-col min-h-60 items-center bg-slate-900 rounded-md p-1">
        <div className="relative top-0 left-0 h-40 w-32">
        <Image src={`${img_300}${cast.profile_path}` || EmptyImage} alt='profile_path' fill className="object-cover"/>
        </div>
        <div>
            <h2>{cast?.original_name || cast?.name}</h2>
            <p><span className="text-gray-400">Character:</span> {cast?.character}</p>
        </div>
    </div>
  )
}

export default MovieCast