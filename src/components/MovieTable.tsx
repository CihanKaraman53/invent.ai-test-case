import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/components/movieTable.scss'; 

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Released: string;
}

interface MovieTableProps {
  movies: Movie[];
}

const MovieTable: React.FC<MovieTableProps> = React.memo(({ movies }) => {
  return (
    <div className="movie-table-container">
      <table className="movie-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Release Date</th>
            <th>IMDB ID</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>
                <Link to={`/movie/${movie.imdbID}`} className="movie-link">
                  {movie.Title}
                </Link>
              </td>
              <td>{movie.Year}</td>
              <td>{movie.imdbID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default MovieTable;
