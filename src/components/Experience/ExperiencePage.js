import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import ExperienceIntroSection from "./ExperienceIntroSection";
import ExperienceReviewsSection from "./ExperienceReviewsSection";
import { graphql } from "react-apollo";
import { loader } from "graphql.macro";
import { config } from "../../config";

import "../../fullpage.css";

const QUERY = loader("../../gql/experience.graphql");
const anchors = ["intro", "reviews"];
const experiencePathStem = `/sites/${
  config.dxSiteKey
}/contents/content/experiences`;

const mapOptions = props => {
  const { isEditing } = props;
  return {
    variables: {
      path: `${experiencePathStem}/${props.match.params.path}`,
      workspace: isEditing ? "EDIT" : "LIVE"
    }
  };
};

const mapResults = results => {
  if (results.data.loading || !results.data.content) {
    return results;
  }
  const result = { experience: results.data.content.experience };
  return Object.assign(result, results);
};

class ExperiencePage extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    const { history, tracker, profileId, sessionId, experience } = this.props;
    const location = history.location;
    const path = location.pathname + location.hash;

    console.log({ profileId });
    console.log({ sessionId });

    const tags = experience && experience.tags ? experience.tags.values : null;
    const interestsArray =
      experience && experience.interests ? experience.interests.values : null;

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
    const { data, experience, isEditing } = this.props;

    // TODO: loading animation
    if (data.loading || !data.content || !experience) {
      return null;
    }

    return (
      <ReactFullpage
        anchors={anchors}
        navigation
        scrollOverflow={true}
        scrollOverflowReset={true}
        scrollOverflowOptions={{ freeScroll: true }}
        licenseKey={config.fullPageLicense}
        navigationTooltips={anchors}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section slide fade-6 kenBurns selected active animate">
                <ExperienceIntroSection {...experience} isEditing={isEditing} />
              </div>
              <div className="section slide fade-6 kenBurns selected active animate">
                <ExperienceReviewsSection
                  {...experience}
                  isEditing={isEditing}
                />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    );
  }
}

export default graphql(QUERY, {
  options: mapOptions,
  props: mapResults
})(ExperiencePage);
