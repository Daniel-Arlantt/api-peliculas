import React, { useEffect, useState } from "react";

export const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const GetMovies = async () => {
    try {
      const peticion = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=73331c41587f852825b2ad2792c1b125&page=${pages}`
      );
      const data = await peticion.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("algo esta mal" + error);
    }
  };

  useEffect(() => {
    GetMovies();
  },[pages]);

  const nextPage = () => {
    if (pages < totalPages) setPages(pages + 1);
  };

  const beforePage = () => {
    if (pages > 1) setPages(pages - 1);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map((movie) => (
            <div key={movie.id} className="group relative">
              <img
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{movie.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {movie.original_language}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {movie.release_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center align-middle gap-x-5">
        <button
          onClick={beforePage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Preview
        </button>
        <span>
          Pagina {pages} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Next
        </button>
      </div>
    </div>
  );
};
