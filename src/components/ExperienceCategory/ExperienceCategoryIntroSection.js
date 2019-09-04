import React, { Fragment, Component } from "react";
import { graphql } from "react-apollo";
import { loader } from "graphql.macro";
import SectionTeasers from "./../SectionTeasers";
import EditButton from "../EditButton";
import BackButton from "../BackButton";
import { getImageUrl } from "../../utils";
import { config } from "../../config";

const QUERY = loader("../../gql/experienceCategory.graphql");
const pathStem = `/sites/${
  config.dxSiteKey
}/contents/content/experience-categories`;

const mapOptions = props => {
  const { isEditing } = props;
  return {
    variables: {
      path: `${pathStem}/${props.match.params.path}`,
      workspace: isEditing ? "EDIT" : "LIVE"
    }
  };
};

const mapResults = results => {
  if (results.data.loading || !results.data.content) {
    return results;
  }
  const result = { category: results.data.content.category };
  return Object.assign(result, results);
};

class ExperienceCategoryIntroSection extends Component {
  componentDidUpdate(prevProps, prevState) {

    const { history, tracker, profileId, sessionId, category } = this.props;

    const location = history.location;
    const path = location.pathname + location.hash;

    console.log({ profileId });
    console.log({ sessionId });

    const tags = category && category.tags ? category.tags.values : null;
    const interestsArray =
      category && category.interests ? category.interests.values : null;
    const interests = {};
    if (interestsArray) {
      interestsArray.forEach(interest => {
        const interstNameValue = interest.split(":");
        const key = interstNameValue[0];
        const value = parseInt(interstNameValue[1]);
        interests[key] = value;
      });
    }

    const properties = {
      path: path,
      pageInfo: {
        destinationURL: path,
        tags: tags
      },
      interests: interests
    };

    console.log(`submitting ${path} to tracker`);
    console.log({ properties });
    tracker.page(properties);
  }

  render() {
    const { category, isEditing } = this.props;
    if (!category) {
      return null;
    }
    const {
      name,
      description,
      backgroundImage,
      experiences,
      path,
      type
    } = category;
    return (
      <Fragment>
        <div className="content">
          <div className="container">
            <div className="wrap">
              <div className="fix-12-12">
                <ul className="flex reverse">
                  <li className="col-6-12 left">
                    <h1
                      className="ae-1 fromLeft"
                      dangerouslySetInnerHTML={{ __html: name.value }}
                    />
                    <div style={{ position: "relative" }}>
                      <EditButton
                        isEditing={isEditing}
                        path={path}
                        typeName={type.name}
                        style={{
                          position: "absolute",
                          top: -125,
                          right: 0,
                          zIndex: 1000
                        }}
                      />
                    </div>
                    <p className="ae-2 fromLeft">
                      <span
                        className="opacity-8"
                        dangerouslySetInnerHTML={{ __html: description.value }}
                      />
                    </p>
                    <SectionTeasers
                      teasers={experiences}
                      isEditing={isEditing}
                    />
                  </li>
                  <li className="col-6-12 cell-16">
                    <BackButton />
                  </li>
                </ul>
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

export default graphql(QUERY, {
  options: mapOptions,
  props: mapResults
})(ExperienceCategoryIntroSection);
