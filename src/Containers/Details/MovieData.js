import {useEffect, useState} from "react";
import MovieDetails from "../../Components/MovieDetails";
import instaPlay from "../../assests/img/instaPlay.svg";
import loadingImage from "../../assests/img/memes-loading.gif";
import defaultImage from "../../assests/img/solid.jpeg";

import "./movie.css";
import {useNavigate, useParams} from "react-router-dom";

const MovieData = () => {
  const [movieDescription, setMovieDescription] = useState({});
  const [trailerVideo, setTrailerVideo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [iconState, setIconState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [playVideoKey, setPlayVideoKey] = useState("");

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDescription();
  }, [id]);

  useEffect(() => {
    fetchTrailer();
  }, [id]);

  const fetchDescription = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=728f79990e026537f04182b251b23988&language=en-US`
      );
      const data = await response.json();
      if (response.ok) {
        setMovieDescription(data);
      } else {
        setErrorMessage(data.status_message);
      }
      setLoader(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const fetchTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=728f79990e026537f04182b251b23988&language=en-US`
      );
      const trailerData = await response.json();
      setTrailerVideo(trailerData);

      const trailer = trailerData.results?.find(
        (video) => video.type === "Trailer"
      );

      if (trailer) {
        const videoKey = trailer.key;
        setIconState(true);
        setPlayVideoKey(videoKey);
      }
    } catch (error) {
      setIconState(false);
      setErrorMessage(error.message);
    }
  };

  const handleGoBack = () => {
    navigate(`/home`);
  };

  const moviePage = () => {
    localStorage.removeItem("searchMovies");
    navigate("/home");
  };

  const myStyle = {
    backgroundImage: movieDescription.backdrop_path
      ? `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.5) 50%), url(https://image.tmdb.org/t/p/original${movieDescription.backdrop_path})`
      : `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.5) 50%), url(${defaultImage})`,
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <header className="detailsPage">
      {loader ? (
        <img className="loadingContent" src={loadingImage} alt="Loading" />
      ) : errorMessage ? (
        <p className="loadingContent">{errorMessage}</p>
      ) : (
        <>
          <nav className="moviePage">
            <img src={instaPlay} alt="navBarLogo" onClick={moviePage} />
          </nav>
          <MovieDetails
            name={movieDescription.title}
            rating={movieDescription.vote_average}
            paragraph={movieDescription.overview}
            releaseDate={movieDescription.release_date}
            languages={movieDescription.spoken_languages}
            handleGoBack={handleGoBack}
            style={myStyle}
            iconState={iconState}
            playVideo={openModal}
            movieDescription={movieDescription}
          />
        </>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {playVideoKey && (
              <iframe
                width="100%"
                height="390"
                src={`https://www.youtube.com/embed/${playVideoKey}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="iframeVideo"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default MovieData;
