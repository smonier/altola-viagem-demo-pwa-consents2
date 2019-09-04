import React from "react";
import "./index.css";
import Screen from "./components/Screen";
import { config } from "./config";
import { graphql } from "react-apollo";
import { loader } from "graphql.macro";
import { withCookies } from "react-cookie";
import duix from "duix";


duix.set('isRegistered', false);

const QUERY = loader("./gql/screen.graphql");

const mapOptions = props => {
  const { cookies, isEditing } = props;
  let { profileId, sessionId } = props;
  if (!cookies) {
    console.warn("no cookies, ma!");
    return {};
  }

  let profileName = cookies.get("profile-name");
  if (!profileName) {
    profileName = "default";
  }
  console.log({ profileId });
  console.log({ profileName });

  if (!profileId || !sessionId) {
    throw Error("profile and session unavailable");
  } else {
    console.log(
      `App: profile ${profileId} was resolved and will be used to retrieve personalized content`
    );
  }

  return {
    variables: {
      profileId: profileId,
      sessionId: sessionId,
      path: `/sites/${
        config.dxSiteKey
      }/contents/content/screens/home-${profileName}`,
      workspace: isEditing ? "EDIT" : "LIVE"
    }
  };
};

const mapResults = results => {
  if (results.data.error) {
    console.error(results.data.error);
  }
  if (results.data.loading || !results.data.content) {
    return results;
  }

  // merging personalized and non-personalized sections
  let sections = results.data.content.screen.sections.items.slice();
  //console.log({ sections });

  const personalizedSection = results.data.content.screen.personalizedSections;
  if (personalizedSection && personalizedSection.items) {
    personalizedSection.items.forEach(section =>
      sections.push(section.factory.variant.node.section)
    );
  }

  sections.sort((a, b) => {
    if (!a.sortOrder || !b.sortOrder) {
      return false;
    }
    return a.sortOrder.floatValue - b.sortOrder.floatValue;
  });

  const result = { sections: sections };
  return Object.assign(result, results);
};

class App extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    const { history, tracker, profileId, sessionId } = this.props;
    const location = history.location;
    const path = location.pathname + location.hash;

    console.log({ profileId });
    console.log({ sessionId });

    const properties = {
      path: path,
      pageInfo: {
        destinationURL: path
      }
    };

    console.log(`submitting ${path} to tracker`);
    console.log({ properties });
    tracker.page(properties);
  }

  render() {
    const { isEditing, data, sections, profileId, sessionId } = this.props;

    //console.log({ isEditing });

    // TODO: for debugging
    if (data.loading) {
      console.warn("Loading...");
      return null;
    }
    // TODO: for debugging
    if (!data) {
      console.error("no data");
      return null;
    }

    // TODO: for debugging
    //console.log({ sections });

    return (
      <Screen
        sections={sections}
        licenseKey={config.fullPageLicense}
        isEditing={isEditing}
        sessionId={sessionId}
        profileId={profileId}
      />
    );
  }
}

export default withCookies(
  graphql(QUERY, {
    props: mapResults,
    options: mapOptions
  })(App)
);
