import Rating from "react-rating-stars-component";
import {useNavigate} from "react-router-dom";
import defaultImage from "../../src/assests/img/solid.jpeg";
import Play from "../../src/assests/img/Play.svg";

const MovieCard = ({rating, name, imageUrl, id, searchMovies}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/home/details/${id}`);
    localStorage.setItem("searchMovies", searchMovies);
  };

  return (
    <div class="card">
      <div className="movieName">
        <img
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/original${imageUrl}`
              : defaultImage
          }
          alt="movieBackgroundImg"
          onClick={handleCardClick}
        />
      </div>
      <div className="movieCard">
        <div className="movieDetails">
          <div>
            <h4>{name}</h4>
            {rating !== 0 && (
              <div className="movieRating">
                <Rating
                  count={Math.floor(rating / 2)}
                  edit={false}
                  color="#ffd700"
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                />
                <div>
                  <p className="rateNumber">{(rating / 2).toFixed(1)} / 5</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <img
              src={Play}
              alt="movieDetailsPage"
              onChange={() => navigate(`/home/details/${id}`)}
              onClick={handleCardClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
