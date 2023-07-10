import instaPlay from "../../assests/img/instaPlay.svg";
import StrangerThings from "../../assests/img/StarngerThings.svg";
import Play from "../../assests/img/Play.svg";
import searchBar from "../../assests/img/searchBar.svg";
import loadingImage from "../../assests/img/memes-loading.gif";
import ReactPaginate from "react-paginate";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MovieCard from "../../Components/MovieCard";

import "./home.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
  const storedSearchMovies = localStorage.getItem("searchMovies");
  const storedActivePage = localStorage.getItem("activepage");

  const page = localStorage.getItem("activepage");

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(page ? page : 1);
  const [activePage, setActivePage] = useState(currentPage);
  const [searchMovies, setSearchMovies] = useState(storedSearchMovies || "");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (storedSearchMovies) {
      setSearchMovies(storedSearchMovies);
    }
    if (storedActivePage) {
      setActivePage(storedActivePage);
      setCurrentPage(storedActivePage);
    }
  }, []);

  const handleSearchChange = (e) => {
    localStorage.removeItem("activepage");
    const movieData = e.target.value;
    setSearchMovies(movieData);
    setCurrentPage(1);
    localStorage.setItem("searchMovies", movieData);
    setLoading(true);
  };

  const pageChange = (e) => {
    const selectedPage = e.selected + 1;
    setActivePage(selectedPage);
    setCurrentPage(selectedPage);
    localStorage.setItem("activepage", selectedPage);
    setLoading(true);
  };

  const goBackButton = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("searchMovies");
    localStorage.removeItem("activepage");
    navigate("/");
    toast.success("LoggedOut successfully", {position: "bottom-right"});
  };
  useEffect(() => {
    if (searchMovies) {
      setLoading(true);
      const pageReload = setTimeout(() => {
        searchMoviesAPI();
      }, 1000);
      return () => clearTimeout(pageReload);
    } else {
      fetchMovies();
    }
  }, [searchMovies, currentPage]);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=728f79990e026537f04182b251b23988&page=${currentPage}`
    );
    const data = await response.json();
    console.log("currentPage:", data);
    setMovies(data.results);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  const searchMoviesAPI = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=728f79990e026537f04182b251b23988&language=en-US&query=${searchMovies}&page=${currentPage}&include_adult=false`
    );
    const movieData = await res.json();
    console.log("SearchedMovies:", movieData);
    setMovies(movieData.results);
    setTotalPages(movieData.total_pages);
    setLoading(false);
  };

  const pageTitle = searchMovies
    ? `Search Movies for "${searchMovies}"`
    : "Trending";

  return (
    <header>
      <nav className="homePage">
        <div>
          <img src={instaPlay} alt="" className="brandLogo" />
        </div>

        <div className="navSearchBar">
          <div className="inputBox">
            <input
              type="text"
              placeholder="Search movies"
              className="searcBox"
              value={searchMovies}
              onChange={handleSearchChange}
            />
            <div className="searchLogo">
              <img src={searchBar} alt="" />
            </div>
          </div>
          <a href="#" className="logOut" onClick={goBackButton}>
            Logout
          </a>
        </div>
      </nav>

      <div className="bannerSection">
        <img src={StrangerThings} alt="" width="100%" />
      </div>

      <h2>{pageTitle}</h2>

      <div className="movieList">
        {loading ? (
          <img src={loadingImage} alt="" />
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <Link >
              <MovieCard
                key={movie?.id}
                id={movie?.id}
                imageUrl={movie?.poster_path}
                name={movie?.title}
                rating={movie?.vote_average}
                Play={Play}
                activePage={activePage}
              />
            </Link>
          ))
        ) : (
          <p style={{color: "white"}}>No movies found.</p>
        )}
      </div>
      <div className="pagiNation">
        {totalPages > 1 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            pageRangeDisplayed={3}
            pageCount={searchMovies ? totalPages : totalPages / 2}
            previousLabel="<"
            onPageChange={pageChange}
            activeClassName="active"
            className="pagiNation"
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </header>
  );
};

export default HomePage;
