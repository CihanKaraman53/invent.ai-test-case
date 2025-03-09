interface MovieDetail {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
}

const MovieInfo: React.FC<{ movieDetail: MovieDetail }> = ({ movieDetail }) => {
  return (
    <div className="movie-info">
      <h1 className="movie-title">{movieDetail.Title}</h1>
      <p>
        <strong>Year:</strong> {movieDetail.Year}
      </p>
      <p>
        <strong>Genre:</strong> {movieDetail.Genre}
      </p>
      <p>
        <strong>Director:</strong> {movieDetail.Director}
      </p>
      <p>
        <strong>Actors:</strong> {movieDetail.Actors}
      </p>
      <p>
        <strong>IMDb:</strong> ⭐ {movieDetail.imdbRating}
      </p>
      <p>
        <strong>Plot:</strong> {movieDetail.Plot}
      </p>
    </div>
  );
};

export default MovieInfo;
