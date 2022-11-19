import MovieCard from "./MovieCard"

const MovieRow = ({movie,title,setOpen,open,setMovieId,movId}) => {

  return (
    <div className="flex flex-col h-80">
    <h2 className="text-white text-2xl">{title}</h2>
    <div className="text-white w-full h-80 flex overflow-x-scroll overflow-y-hidden scrollbar-hide space-x-2 md:space-x-4">
        {movie.map((mov)=><MovieCard key={mov.id} movie={mov} setOpen={setOpen} open={open} setMovieId={setMovieId} movId={movId}/>)}  
    </div>
    </div>
  )
}

export default MovieRow