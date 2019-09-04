import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import SectionText from "./SectionText";
import SectionImage from "./SectionImage";
import SectionCta from "./SectionCta";
import SectionTeasers from "./SectionTeasers";
import { FlexyFlipCard } from "flexy-flipcards";
import FlipFlopsIcon from "./icons/FlipFlopsIcon";
import EditButton from "./EditButton";
import ProfileIcon from "./icons/ProfileIcon";
import { getSvgIcon } from "./icons/svgIcons";
import "../fullpage.css";
import RegistrationSection from "./RegistrationSection";

const profiles = [  
  {
    name: "business-traveller",
    displayName: "Business"
  },
  {
    name: "FSI-Bank",
    displayName: "Bank"
  },
  {
    name: "FSI-Insurance",
    displayName: "Insurance"
  },
  {
    name: undefined,
    displayName: "Default"
  }
];

class ProfilePreset extends React.Component {
  state = {
    selected: this.props.cookies.get("profile-name") === this.props.name
  };

  constructor(props) {
    super(props);
    this.selectProfile = this.selectProfile.bind(this);
  }

  selectProfile(value) {
    const { cookies, history } = this.props;
    if (!cookies) {
      console.warn("no cookies, ma!");
      return;
    }
    if (!value) {
      cookies.remove("profile-name", value, { path: "/" });
    } else {
      cookies.set("profile-name", value, { path: "/" });
    }

    const currentLocation = history.location.pathname;
    history.push("/null");
    setTimeout(() => {
      history.push(currentLocation);
    });
  }

  render() {
    const { name, displayName } = this.props;
    const { selected } = this.state;
    const icon = getSvgIcon(name ? name : "reset");
    return (
      <div className="fix-5-12 crop">
        <div className={`${selected ? "pad" : ""} ae-4`}>
          <ProfileIcon selected={selected}>{icon}</ProfileIcon>
          <h3 className="ae-5">{displayName}</h3>
          {!selected && (
            <button
              onClick={() => this.selectProfile(name)}
              className="button small blue gradient crop ae-7"
            >
              Select
            </button>
          )}
        </div>
      </div>
    );
  }
}

class Screen extends React.Component {
  render() {
    const { sections, licenseKey, isEditing, sessionId, profileId } = this.props;
    const anchors = sections ? sections.map(section => section.name.value) : [];
    return (
      <ReactFullpage
        anchors={anchors}
        navigation
        scrollOverflow={true}
        scrollOverflowReset={true}
        scrollOverflowOptions={{ freeScroll: true }}
        licenseKey={licenseKey}
        navigationTooltips={anchors}
        render={({ state, fullpageApi }) => {
          return (
            <div>
              {sections &&
                sections.map((section, index) => {
                  return section.name.value === "registration" ? (
                    <RegistrationSection
                      key={index}
                      section={section}
                      {...this.props}
                      isEditing={isEditing}
                      sessionId={sessionId}
                      profileId={profileId}
                    />
                  ) : (
                    <ScreenSection
                      key={index}
                      section={section}
                      {...this.props}
                      isEditing={isEditing}
                    />
                  );
                })}
            </div>
          );
        }}
      />
    );
  }
}

class ScreenSection extends React.Component {
  render() {
    const { section, isEditing } = this.props;
    return (
      <Section {...section}>
        <FlexyFlipCard
          frontBackgroundColor="transparent"
          backBackgroundColor="transparent"
        >
          <div className="top-margin-card padding-left-2 padding-right-2">
            <EditButton
              isEditing={isEditing}
              path={section.path}
              typeName={section.type.name}
            />
            <button
              className="button small cropBottom"
              style={{
                position: "absolute",
                top: 0,
                right: -5,
                zIndex: 100,
                padding: 7,
                display: isEditing ? "none" : ""
              }}
              type="button"
              ref="flipper"
            >
              <FlipFlopsIcon style={{ opacity: 0.9 }} />
            </button>
            <div className="fix-10-12 toCenter padding-top-4">
              <SectionTitle title={section.title} />
              <SectionText text={section.text} />
              <SectionImage {...section} />
              <SectionCta {...section} />
            </div>
            <SectionTeasers {...section} isEditing={isEditing} />
          </div>
          <div className="top-margin-card padding-top-6 padding-left-2 padding-right-2">
            <ul className="grid later equal">
              {profiles.map((profile, index) => (
                <li
                  key={index}
                  className="col-3-12 col-tablet-1-2 col-phone-1-1 padding-1"
                >
                  <ProfilePreset {...this.props} {...profile} />
                </li>
              ))}
            </ul>
            <button
              className="button small cropBottom"
              style={{
                position: "absolute",
                top: 0,
                right: -5,
                padding: 7
              }}
              type="button"
              ref="flipper"
            >
              <FlipFlopsIcon />
            </button>
          </div>
        </FlexyFlipCard>
      </Section>
    );
  }
}

export default withCookies(withRouter(Screen));
