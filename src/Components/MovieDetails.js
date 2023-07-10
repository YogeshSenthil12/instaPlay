import {useState} from "react";

const MovieDetails = ({
  leftArrow,
  Play,
  rating,
  name,
  releaseDate,
  paragraph,
  languages,
  handleGoBack,
  playVideo,
  iconState,
  style,
  movieDescription,
}) => {
  const languageNames = languages
    ? languages.map((language) => language.english_name)
    : [];

  return (
    <div className="movieDescription" style={style}>
      <div className="responsiveMovie" >
        <div className="movieImage">
          <img
            src={`https://image.tmdb.org/t/p/original${movieDescription.backdrop_path}`}
          />
        </div>
        <div className="playIcon">
          <img src={Play} onClick={playVideo} alt=""/>
        </div>
      </div>
      <div className="movieDatabase">
        <div>
          <img
            src={leftArrow}
            alt=""
            className="leftArrow"
            onClick={handleGoBack}
          />
        </div>
        <div>
          <h5 style={{marginTop: "20px"}}>{name}</h5>
          <p>Rating: {(rating / 2).toFixed(1)} / 5</p>
          <p className="paraGraph">{paragraph}</p>
        </div>

        <div className="releaseDates">
          <div>Release Date</div>
          <div>{releaseDate && releaseDate.slice(0, 4)}</div>
        </div>

        <div className="movielanguage">
          <div>Orginal Language</div>
          <div>{languageNames.join(", ")}</div>
        </div>
      </div>

      {iconState && (
        <div className="playButton">
          <img src={Play} alt=" " onClick={playVideo} />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
