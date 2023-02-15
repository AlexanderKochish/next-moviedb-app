import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { API_KEY } from "../requests";
import { MdOutlineClose, MdInfoOutline } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import PreLoader from "./PreLoader";

const Modal = ({ setOpen, open, movie }) => {
  const [movVideo, setMovVideo] = useState("");
  const [play, setPlay] = useState(false);
  const [info, setInfo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getVideoTrailer() {
        try{
            setLoading(loading);
            const res = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
            );
            const data = await res.json();
            setLoading(!loading);
            return setMovVideo(data.results[0]?.key);
        }catch(err){
            console.log(err.message)
        }
    }
    getVideoTrailer();
  }, [movie.id]);

  const loader = loading ? <PreLoader /> : null;
  const content = !loading ? (
    <View
      movVideo={movVideo}
      setOpen={setOpen}
      open={open}
      play={play}
      info={info}
      setInfo={setInfo}
      setPlay={setPlay}
      movie={movie}
    />
  ) : null;
  return (
    <div className="absolute flex flex-col items-center justify-center bg-black/70 z-30 top-0 left-0 w-full h-screen">
      <div className="relative flex flex-col w-full h-screen items-center justify-center space-y-4">
        {loader}
        {content}
      </div>
    </div>
  );
};

const View = ({
  movVideo,
  setOpen,
  open,
  play,
  info,
  setInfo,
  setPlay,
  movie,
}) => {
  return (
    <div className="flex relative flex-col z-40 w-3/4 h-3/4 lg:h-3/4 bg-black pb-10">
      <MdOutlineClose
        onClick={() => setOpen(!open)}
        className="cursor-pointer m-1 hover:animate-pulse w-10 h-10 text-white flex self-end"
      />
      <div className="w-full h-full flex flex-col justify-center items-center">
        {!movVideo? 
        <h2 className="text-white text-3xl font-semibold">Not Found Video</h2> : 
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${movVideo}`}
          width="100%"
          height="100%"
          controls={true}
          loop={true}
          playing={play}
        />}
      </div>
      <div className="flex absolute flex-col left-0 top-[480px] bottom-14">
        <div className="ml-5 flex space-x-3">
        <button
          onClick={() => setPlay(!play)}
          className="bg-rose-700 text-white py-1 px-3 md:py-2 md:px-4 rounded-xl inline-flex items-center"
        >
          <FaPlay className="mr-2" />
          Play
        </button>
        <button
          onClick={() => setInfo(!info)}
          className="bg-gray-500 py-1 px-4 rounded-xl inline-flex items-center"
        >
          <MdInfoOutline className="m-1 text-white" />
        </button>
        </div>
        <div className={info ? "text-white flex mt-7 min-h-max w-full bg-black flex-col px-4" : "hidden"}>
        <h2 className="text-2xl">{movie.original_title || movie.title}</h2>
        <p className="text-md">{movie.overview}</p>
      </div>
      </div>
      
    </div>
  );
};

export default Modal;
