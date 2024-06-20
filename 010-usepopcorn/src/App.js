import { useEffect, useRef, useState } from "react";
import StarRating from "./components/StarRating";

const tempMovieData = [
   {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
   },
   {
      imdbID: "tt0133093",
      Title: "The Matrix",
      Year: "1999",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
   },
   {
      imdbID: "tt6751668",
      Title: "Parasite",
      Year: "2019",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
   },
];

const tempWatchedData = [
   {
      imdbID: "tt1375666",
      Title: "Inception",
      Year: "2010",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      runtime: 148,
      imdbRating: 8.8,
      userRating: 10,
   },
   {
      imdbID: "tt0088763",
      Title: "Back to the Future",
      Year: "1985",
      Poster:
         "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      runtime: 116,
      imdbRating: 8.5,
      userRating: 9,
   },
];

const average = (arr) =>
   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//---------------

const KEY = "6f703412";

export default function App() {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState("");
   const [query, setQuery] = useState("");
   const [selectedID, setSelectedID] = useState(null);

   // const [watched, setWatched] = useState([]);

   //* Setting the initial value of the watched state to the values stored in localStorage
   const [watched, setWatched] = useState(function () {
      const storedValue = localStorage.getItem("watched");
      return JSON.parse(storedValue);
   });

   //! This will cause an infinite loop as when the component is rendered (render logic) it will execute the top-level code
   //! It will define states, and then fetch from API, and then --> we are setting the state to something new which triggers a re-render (infinite loop)
   // fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
   //    .then((res) => res.json())
   //    .then((data) => setMovies(data));

   function handleSelectMovie(id) {
      setSelectedID((selectedID) => (id === selectedID ? null : id));
   }

   function handleCloseMovie() {
      setSelectedID(null);
   }

   function handleAddWatch(movie) {
      setWatched((watched) => [...watched, movie]);

      // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
   }

   function handleDeleteWatch(id) {
      setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
   }

   //! Making our watched movies store into local storage
   useEffect(
      function () {
         localStorage.setItem("watched", JSON.stringify(watched));
      },
      [watched]
   );

   //! Effect to make an API call whenever we search for a movie
   useEffect(
      function () {
         const controller = new AbortController();

         async function fetchMovies() {
            try {
               setIsLoading(true);
               setError("");

               const response = await fetch(
                  `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                  { signal: controller.signal }
               );

               if (!response.ok)
                  throw new Error("Something went wrong with fetching movies.");

               const data = await response.json();

               if (data.Response === "False") {
                  throw new Error("Movie not found.");
               }

               setMovies(data.Search);
            } catch (err) {
               console.error(err);
               if (err.name !== "AbortError") {
                  setError(err.message);
               }
            } finally {
               setIsLoading(false);
            }
         }

         if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
         }

         handleCloseMovie();
         fetchMovies();

         return function () {
            controller.abort();
         };
      },
      [query]
   );

   return (
      <>
         <NavBar>
            <Logo />
            <Search query={query} setQuery={setQuery} />
            <NumResults movies={movies} />
         </NavBar>
         <Main>
            {/* <Box element={<MovieList movies={movies} />} />
            <Box
               element={
                  <>
                     <WatchedSummary watched={watched} />
                     <WatchedMoviesList watched={watched} />
                  </>
               }
            /> */}
            <Box>
               {isLoading && <Loader />}
               {!isLoading && !error && (
                  <MovieList
                     movies={movies}
                     onSelectMovie={handleSelectMovie}
                  />
               )}
               {error && <ErrorMessage message={error} />}
            </Box>
            <Box>
               {selectedID ? (
                  <MovieDetails
                     selectedID={selectedID}
                     onCloseMovie={handleCloseMovie}
                     onAddWatched={handleAddWatch}
                     watchedArray={watched}
                  />
               ) : (
                  <>
                     <WatchedSummary watched={watched} />
                     <WatchedMoviesList
                        watched={watched}
                        onDeleteWatched={handleDeleteWatch}
                     />
                  </>
               )}
            </Box>
         </Main>
      </>
   );
}

function Loader() {
   return <p className="loader"> loading...</p>;
}

function ErrorMessage({ message }) {
   return (
      <p className="error">
         <span>😀 {message}</span>
      </p>
   );
}

function Main({ children }) {
   return <main className="main">{children}</main>;
}

// -----------
function NavBar({ children }) {
   return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
   return (
      <div className="logo">
         <span role="img">🍿</span>
         <h1>usePopcorn</h1>
      </div>
   );
}

function Search({ query, setQuery }) {
   const inputElement = useRef(null);

   useEffect(function () {
      function callBack(e) {
         if (document.activeElement === inputElement.current) {
            return;
         }

         if (e.code === "Enter") {
            inputElement.current.focus();
            setQuery("");
         }
      }
      document.addEventListener("keydown", callBack);

      inputElement.current.focus();
   }, []);

   return (
      <input
         className="search"
         type="text"
         placeholder="Search movies..."
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         ref={inputElement}
      />
   );
}

function NumResults({ movies }) {
   return (
      <p className="num-results">
         Found <strong>{movies?.length ?? 0}</strong> results
      </p>
   );
}

// ----------------

function Box({ children }) {
   const [isOpen, setIsOpen] = useState(true);
   return (
      <div className="box">
         <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
         >
            {isOpen ? "–" : "+"}
         </button>
         {isOpen && children}
      </div>
   );
}

// function WatchedBox() {
//    const [watched, setWatched] = useState(tempWatchedData);
//    const [isOpen2, setIsOpen2] = useState(true);

//    return (
//       <div className="box">
//          <button
//             className="btn-toggle"
//             onClick={() => setIsOpen2((open) => !open)}
//          >
//             {isOpen2 ? "–" : "+"}
//          </button>
//          {isOpen2 && (
//             <>
//                <WatchedSummary watched={watched} />
//                <WatchedMoviesList watched={watched} />
//             </>
//          )}
//       </div>
//    );
// }

function MovieList({ movies, onSelectMovie }) {
   return (
      <ul className="list list-movies">
         {movies?.map((movie) => (
            <Movie
               movie={movie}
               key={movie.imdbID}
               onSelectMovie={onSelectMovie}
            />
         ))}
      </ul>
   );
}

function Movie({ movie, onSelectMovie }) {
   return (
      <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
         <img src={movie.Poster} alt={`${movie.Title} poster`} />
         <h3>{movie.Title}</h3>
         <div>
            <p>
               <span>🗓</span>
               <span>{movie.Year}</span>
            </p>
         </div>
      </li>
   );
}

//

function MovieDetails({
   selectedID,
   onCloseMovie,
   onAddWatched,
   watchedArray,
}) {
   //! Effect to listen to global keypresses for the esc key (attaching an event handler to the document object)
   useEffect(
      function () {
         function callBack(e) {
            if (e.code === "Escape") {
               onCloseMovie();
               console.log("CLosing ");
            }
         }

         document.addEventListener("keydown", callBack);

         return function () {
            document.removeEventListener("keydown", callBack);
         };
      },
      [onCloseMovie]
   );

   const [movie, setMovie] = useState({});
   const [isLoading, setIsLoading] = useState(false);
   const [userRating, setUserRating] = useState("");

   const isWatched = watchedArray
      .map((object) => object.imdbID)
      .includes(selectedID);

   const watchedUserRating = watchedArray.find(
      (movie) => movie.imdbID === selectedID
   )?.userRating;

   const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
   } = movie;

   function handleAdd() {
      const newWatchedMovie = {
         imdbID: selectedID,
         title,
         year,
         poster,
         imdbRating: Number(imdbRating),
         runtime: Number(runtime.split(" ").at(0)),
         userRating: userRating,
      };

      onAddWatched(newWatchedMovie);
      onCloseMovie();
   }

   useEffect(
      function () {
         async function getMovieDetails() {
            setIsLoading(true);
            const response = await fetch(
               `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
            );

            const data = await response.json();
            console.log(data);
            setMovie(data);
            setIsLoading(false);
         }

         getMovieDetails();
      },
      [selectedID]
   );

   useEffect(
      function () {
         if (!title) {
            return;
         }
         document.title = `Movie | ${title}`;

         //! Cleanup Function
         return function () {
            document.title = "usePopcorn";
         };
      },
      [title]
   );

   return (
      <div className="details">
         {isLoading ? (
            <Loader />
         ) : (
            <>
               <header>
                  <button className="btn-back" onClick={onCloseMovie}>
                     &larr;
                  </button>
                  <img src={poster} alt={`Poster of ${movie}`} />
                  <div className="details-overview">
                     <h2>{title}</h2>
                     <p>
                        {released} &bull; {runtime}
                     </p>
                     <p>
                        <span>⭐</span> {imdbRating}
                     </p>
                  </div>
               </header>

               <section>
                  <div className="rating">
                     {!isWatched ? (
                        <>
                           <StarRating
                              maxRating={10}
                              size={24}
                              onSetRating={setUserRating}
                           ></StarRating>

                           {userRating > 0 && (
                              <button className="btn-add" onClick={handleAdd}>
                                 Add To List
                              </button>
                           )}
                        </>
                     ) : (
                        <p>
                           {" "}
                           You already rated this movie. {watchedUserRating} ⭐
                        </p>
                     )}
                  </div>
                  <p>
                     <em>{plot}</em>
                  </p>
                  <p>Starring {actors}</p>
                  <p>Directed by {director}</p>
               </section>
            </>
         )}
      </div>
   );
}

//--------------

function WatchedSummary({ watched }) {
   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
   const avgUserRating = average(watched.map((movie) => movie.userRating));
   const avgRuntime = average(watched.map((movie) => movie.runtime));
   return (
      <div className="summary">
         <h2>Movies you watched</h2>
         <div>
            <p>
               <span>#️⃣</span>
               <span>{watched.length} movies</span>
            </p>
            <p>
               <span>⭐️</span>
               <span>{avgImdbRating.toFixed(2)}</span>
            </p>
            <p>
               <span>🌟</span>
               <span>{avgUserRating.toFixed(2)}</span>
            </p>
            <p>
               <span>⏳</span>
               <span>{avgRuntime.toFixed(0)} min</span>
            </p>
         </div>
      </div>
   );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
   return (
      <ul className="list">
         {watched.map((movie) => (
            <WatchedMovieItem
               movie={movie}
               key={movie.imdbID}
               onDeleteWatched={onDeleteWatched}
            />
         ))}
      </ul>
   );
}

function WatchedMovieItem({ movie, onDeleteWatched }) {
   return (
      <li>
         <img src={movie.poster} alt={`${movie.Title} poster`} />
         <h3>{movie.title}</h3>
         <div>
            <p>
               <span>⭐️</span>
               <span>{movie.imdbRating}</span>
            </p>
            <p>
               <span>🌟</span>
               <span>{movie.userRating}</span>
            </p>
            <p>
               <span>⏳</span>
               <span>{movie.runtime} min</span>
            </p>

            <button
               className="btn-delete"
               onClick={() => onDeleteWatched(movie.imdbID)}
            >
               X
            </button>
         </div>
      </li>
   );
}
