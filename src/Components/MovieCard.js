import Rating from "react-rating-stars-component";
import {useNavigate} from "react-router-dom";
import defaultImage from "../../src/assests/img/solid.jpeg";

const MovieCard = ({rating, name, imageUrl, Play, id, activePage}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    
    navigate(`/home/details/${id}`);
  };
  return (
    <div class="card" onClick={handleCardClick}>
      <div className="movieName">
        <img
          src={
            imageUrl
              ? `https://image.tmdb.org/t/p/original${imageUrl}`
              : defaultImage
          }
          alt=""
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
              alt=" "
              onClick={() => navigate(`/home/details/${id}`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
