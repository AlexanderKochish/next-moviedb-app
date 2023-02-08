import MovieCard from "./MovieCard";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useRef, useState } from "react";

const MovieRow = ({ movie, title }) => {
  const [moved, setMoved] = useState(false);
  const ref = useRef(null);

  const handleMovedArrowRightAndLeft = (arrow) => {
    setMoved(true);

    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;

      const scrollTo =
        arrow === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col h-80">
      <h2 className="text-white text-2xl">{title}</h2>
      <div className="group relative flex items-center">
        <MdArrowBackIos
          onClick={() => handleMovedArrowRightAndLeft("left")}
          className={`absolute cursor-pointer opacity-0 group-hover:opacity-100 left-2 z-20 w-10 h-10 text-white ${
            !moved && "hidden"
          }`}
        />
        <div
          ref={ref}
          className="text-white w-full h-80 flex overflow-x-scroll items-center overflow-y-hidden scrollbar-hide space-x-2 md:space-x-4"
        >
          {movie.map((mov) => (
            <MovieCard key={mov.id} movie={mov} />
          ))}
        </div>
        <MdArrowForwardIos
          onClick={() => handleMovedArrowRightAndLeft("right")}
          className="absolute cursor-pointer opacity-0 group-hover:opacity-100 right-2 z-20 w-10 h-10 text-white"
        />
      </div>
    </div>
  );
};

export default MovieRow;
