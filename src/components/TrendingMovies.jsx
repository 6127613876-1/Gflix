import React, { useEffect, useState } from "react";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(movies)
  useEffect(() => {
    const fetchMovies = () => {
      const data = null;
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          try {
            const response = JSON.parse(this.responseText);
            if (response?.results?.length) {
              const filtered = response.results.filter(
                (movie) =>
                  movie.primaryImage?.url || (movie.thumbnails && movie.thumbnails.length > 0)
              );
              setMovies(filtered);
              localStorage.setItem("trendingMovies", JSON.stringify(filtered));
              localStorage.setItem("trendingMoviesTime", Date.now().toString());
            }
          } catch (err) {
            console.error("Failed to parse response:", err);
          } finally {
            setLoading(false);
          }
        }
      });

      xhr.open(
        "GET",
        "https://imdb236.p.rapidapi.com/api/imdb/search?type=movie&genre=Drama&rows=25&sortOrder=ASC&sortField=id"
      );
      xhr.setRequestHeader("x-rapidapi-key", "e8285ac05fmsh664bb331148ba9ep15133fjsn59ad9a6ec01f");
      xhr.setRequestHeader("x-rapidapi-host", "imdb236.p.rapidapi.com");

      xhr.send(data);
    };

    const cached = localStorage.getItem("trendingMovies");
    const cachedTime = localStorage.getItem("trendingMoviesTime");

    if (cached && cachedTime && Date.now() - cachedTime < 1000 * 60 * 30) {
      setMovies(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchMovies();
    }
  }, []);

  const getImageUrl = (movie) => {
    if (movie.primaryImage?.url) return movie.primaryImage.url;
    if (movie.thumbnails?.length) return movie.thumbnails[0]?.url;
    return null;
  };

  if (loading) return <p className="text-center text-white">Loading...</p>;

  return (
    <section className="py-10 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-pink-500">Trending Drama Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie, idx) => {
            const imageUrl = getImageUrl(movie);
            if (!imageUrl) return null;

            return (
              <div
                key={idx}
                className="bg-zinc-800 rounded-xl overflow-hidden shadow-md flex flex-col"
              >
                <img
                  src={imageUrl}
                  alt={movie.primaryTitle}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {movie.primaryTitle}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      {movie.releaseDate ? `Released: ${movie.releaseDate}` : "Coming Soon"}
                    </p>
                    <p className="text-sm text-zinc-400">
                      Genre: {movie.genres?.join(", ") || "N/A"}
                    </p>
                    <p className="text-sm text-zinc-400">
                      Country: {movie.countriesOfOrigin?.join(", ") || "N/A"}
                    </p>
                    <p className="text-sm text-yellow-400 mt-1">
                      ⭐ {movie.averageRating}
                    </p>
                  </div>
                  <a
                    href={movie.url || `https://www.imdb.com/title/${movie.id}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 block bg-pink-500 hover:bg-pink-600 text-center py-2 rounded text-white font-medium transition"
                  >
                    ▶ Watch
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrendingMovies;
