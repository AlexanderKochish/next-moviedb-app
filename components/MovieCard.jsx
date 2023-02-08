import Image from "next/image";
import Link from "next/link";
import { img_500 } from "../requests";

const MovieCard = ({ movie }) => {
  return (
    <div className="flex items-center">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative z-10  w-40 h-60  flex items-center cursor-pointer">
          <Image
            src={`${img_500}/${movie?.poster_path || movie?.backdrop_path}`}
            alt={movie?.title || movie?.original_title || "poster-movie"}
            fill
            className="rounded-2xl object-fill md:hover:scale-105 duration-300 hover:shadow-rose-600 shadow-lg"
          />
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
