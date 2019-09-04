import React, { Component, Fragment } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
import ContentLoader, { List } from "react-content-loader";
import { getImageUrl } from '../../utils';

const reviewCount = 2;

class ExperienceReviewsSection extends Component {
  state = {
    reviews: []
  };

  componentDidMount() {
    const { businessName } = this.props;
    if (!businessName || !businessName.value) {
      console.warn("no yelp business name is available for this experience");
      return [];
    }
    const host = process.env.REACT_APP_REVIEWS_HOST;
    axios
      .get(host, {
        params: {
          name: businessName.value
        }
      })
      .then(response => response.data.data.reviews.review)
      .then(reviews =>
        reviews
          .filter(r => r.rating > 3)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, reviewCount)
      )
      .then(reviews => {
        this.setState({ reviews });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { backgroundImage } = this.props;
    const { reviews } = this.state;

    // TODO: refactor this
    let reviewList = [];
    if (reviews.length > 0) {
      reviewList = reviews.map((review, index) => (
        <Review key={index} {...review} />
      ));
    } else {
      for (let i = 0; i < reviewCount; i++) {
        reviewList.push(<ReviewPlaceholder key={i} />);
      }
    }

    return (
      <Fragment>
        <div className="content">
          <div className="container">
            <div className="wrap">
              <div className="fix-10-12">
                <h1 className="ae-1 small margin-top-4 fromLeft margin-bottom-1">
                  Featured Reviews
                </h1>
              </div>
              <div className="fix-12-12 padding-left-2 padding-right-2">
                <ul className="flex later left">{reviewList}</ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="background"
          style={{
            backgroundImage: `url(${getImageUrl(backgroundImage)})`
          }}
        />
      </Fragment>
    );
  }
}

const Review = ({ text, rating, url, user, time_created }) => {
  return (
    <li className="col-6-12 box-88">
      <div className="quoteBubble ae-4 fromLeft padding-2">
        <p
          className="tiny cropBottom light opacity-8"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <StarRatings
          rating={rating}
          starRatedColor="#FFDF00"
          numberOfStars={5}
          starDimension="30px"
          name="rating"
        />
        <p className="tiny cropBottom light opacity-8">
          <a href={url} target="_new">
            Read more
          </a>
        </p>
      </div>
      <p className="margin-top-1 tiny ae-6 fromRight">
        <strong>{user.name}</strong>&nbsp;
        <span className="opacity-7">{time_created}</span>
      </p>
    </li>
  );
};

const ReviewPlaceholder = () => {
  return (
    <li className="col-6-12 box-88">
      <div className="quoteBubble ae-4 fromLeft">
        <List />
      </div>
      <p className="margin-top-1 tiny ae-6 fromRight">
        <AuthorContentLoader />
      </p>
    </li>
  );
};

const AuthorContentLoader = () => (
  <ContentLoader>
    <rect x="0" y="0" rx="5" ry="5" width="200" height="50" />
  </ContentLoader>
);

export default ExperienceReviewsSection;
