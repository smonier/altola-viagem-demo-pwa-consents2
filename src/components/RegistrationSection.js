import React from "react";
import { mediaPrefix } from "../config";
import SectionTitle from "./SectionTitle";
import SectionText from "./SectionText";
import RegistrationForm from "./RegistrationForm";

class RegistrationSection extends React.Component {
  render() {
    const { section, profileId, sessionId } = this.props;
    const backgroundImageUrl = section && section.backgroundImage ? encodeURI(
      `${mediaPrefix}${section.backgroundImage.image.path}`
    ) : "";

    return (
      <section className="section slide fade-6 kenBurns selected animate">
        <div className="content">
          <div className="container">
            <div className="wrap">
              <SectionTitle title={section.title} />
              <SectionText text={section.text} />
              <RegistrationForm 
                profileId={profileId}
                sessionId={sessionId}
              />
            </div>
          </div>
        </div>
        <div
          className="background"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`
          }}
        />
      </section>
    );
  }
}

export default RegistrationSection;