import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchMovieDetail, clearMovieDetail } from "../store/slices/movieSlice";
import { useAppDispatch } from "../store/hooks";
import "../styles/components/movieDetail.scss";
import Loading from "../components/loader";
import MovieInfo from "../components/MovieInfo";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { movieDetail, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetail(id));
    }
    return () => {
      dispatch(clearMovieDetail());
    };
  }, [dispatch, id]);

  if (loading) return <Loading />;

  if (error) return <div className="error">Hata: {error}</div>;
  if (!movieDetail)
    return <div className="error">Film detayları bulunamadı</div>;

  return (
    <div className="movie-container">
      <div className="movie-card">
        <img
          className="movie-poster"
          src={movieDetail.Poster}
          alt={movieDetail.Title}
        />
        <MovieInfo movieDetail={movieDetail} />
      </div>
    </div>
  );
};

export default MovieDetail;
