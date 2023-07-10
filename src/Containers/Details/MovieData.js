import React, {useEffect, useState} from "react";
import MovieDetails from "../../Components/MovieDetails";
import instaPlay from "../../assests/img/instaPlay.svg";
import leftArrow from "../../assests/img/leftArrow.svg";
import Play from "../../assests/img/Play.svg";
import loadingImage from "../../assests/img/memes-loading.gif";
import defaultImage from "../../assests/img/solid.jpeg";

import "./movie.css";
import {useNavigate, useParams} from "react-router-dom";

const MovieData = ({activePage}) => {
  const [movieDescription, setMovieDescription] = useState({});
  const [trailerVideo, setTrailerVideo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [iconState, setIconState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDescription = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=728f79990e026537f04182b251b23988&language=en-US`
      );
      const data = await response.json();
      if (response.ok) {
        setMovieDescription(data);
        console.log("Movie Description", data);
      } else {
        setErrorMessage(data.status_message);
      }
      setLoader(false);
    };
    fetchDescription();
  }, [id]);
  console.log("id value", id);

  const handleGoBack = () => {
    navigate(`/home`);
  };

  const moviePage = () => {
    navigate("/home");
  };

  //fetch the video details
  useEffect(() => {
    const fetchTrailer = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=728f79990e026537f04182b251b23988&language=en-US`
      );
      const trailerData = await response.json();
      setTrailerVideo(trailerData);
      console.log("Trailer Description", trailerData);

      const trailer = trailerData.results?.find(
        (video) => video.type === "Trailer"
      );

      if (trailer) {
        const videoKey = trailer.key;
        const videoType = trailer.type;
        console.log("TrailerKey:", videoKey);
        console.log("TrailerType:", videoType);
        setIconState(true);
      }
    };
    fetchTrailer();
  }, [id]);
  console.log("Trailer id value", id);

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

  const playVideo = () => {
    if (
      trailerVideo &&
      trailerVideo.results &&
      trailerVideo.results.length > 0
    ) {
      const trailer = trailerVideo.results?.find(
        (video) => video.type === "Trailer"
      );

      if (trailer) {
        const videoKey = trailer.key;
        return videoKey;
      }
    }
    return null;
  };

  return (
    <header className="detailsPage">
      {loader ? (
        <img className="loadingContent" src={loadingImage} />
      ) : errorMessage ? (
        <p className="loadingContent">{errorMessage}</p>
      ) : (
        <>
          <nav className="moviePage">
            <img src={instaPlay} alt="" onClick={moviePage} />
          </nav>
          <MovieDetails
            leftArrow={leftArrow}
            Play={Play}
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
            {playVideo() && (
              <iframe
                width="100%"
                height="390"
                src={`https://www.youtube.com/embed/${playVideo()}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                type="text/html"
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
