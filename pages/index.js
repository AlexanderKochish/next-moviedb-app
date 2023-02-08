import MovieRow from "../components/MovieRow";
import requests from "../requests";
import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

export default function Home({ trending, discover, topRated, popular }) {
  const [movId, setMovieId] = useState(0);
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Layout trending={trending}>
      {!currentUser ? (
        setTimeout(() => router.push("/sign_in"), 0)
      ) : (
        <>
          <MovieRow title="Trending Movies" movie={trending} movId={movId} />
          <MovieRow title="Discover Movies" movie={discover} movId={movId} />
          <MovieRow title="Top Rated" movie={topRated} movId={movId} />
          <MovieRow title="Popular Movies" movie={popular} movId={movId} />
        </>
      )}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const [trending, discover, topRated, popular] = await Promise.all([
    fetch(`${requests.trending}`)
      .then((response) => response.json())
      .catch((err) => console.log(err)),
    fetch(`${requests.discover}`)
      .then((response) => response.json())
      .catch((err) => console.log(err)),
    fetch(`${requests.topRated}`)
      .then((response) => response.json())
      .catch((err) => console.log(err)),
    fetch(`${requests.popular}`)
      .then((response) => response.json())
      .catch((err) => console.log(err)),
  ]);
  return {
    props: {
      trending: trending.results,
      discover: discover.results,
      topRated: topRated.results,
      popular: popular.results,
    },
  };
};
