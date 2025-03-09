import React, { useEffect, useCallback } from "react";
import {  useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setSearchQuery,
  setSearchType,
  setSelectedYear,
  setPage,
  fetchMovies,
} from "../store/slices/movieSlice";
import MovieTable from "../components/MovieTable";
import Button from "../components/button";
import SearchInput from "../components/searchInput";
import SelectInput from "../components/selectInput";
import Pagination from "@mui/material/Pagination"; 
import "../styles/components/home.scss";
import { useAppDispatch } from "../store/hooks";
import { categoryOptions } from "../constans/SearchCategories"; 
import Error from "../components/error/Error";

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    searchQuery,
    searchType,
    selectedYear,
    movies,
    page,
    totalPages,
    loading,
    error,
  } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies({ searchQuery, searchType, page: 1, selectedYear }));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchMovies({ searchQuery, searchType, page, selectedYear }));
    dispatch(setPage(1));
  };

  const handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "movie" | "series" | "game";
    dispatch(setSearchType(value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedYear(e.target.value));
  };

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      dispatch(setPage(value));
      dispatch(
        fetchMovies({ searchQuery, searchType, page: value, selectedYear })
      );
    },
    [dispatch, searchQuery, searchType, selectedYear]
  );

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Search Filters</h2>
        <SearchInput
          label="Search Movies"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          placeholder="Search"
        />
        <SelectInput
          label="Select Type"
          value={searchType}
          onChange={handleSearchTypeChange}
          options={categoryOptions}
          placeholder="Select Type"
        />
        <SearchInput
          label="Search by Year"
          value={selectedYear}
          onChange={handleYearChange}
          placeholder="Enter Year (e.g., 2020)"
        />
        <Button variant="primary" size="medium" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <div className="main-content">
        <h1 className="main-title">Movie List</h1>
        {error && <Error message={`${error} Please search again.`}/>} 
        {!error && (
          <>
            <MovieTable movies={movies} />
            <div className="pagination-container">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
