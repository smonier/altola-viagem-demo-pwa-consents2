import React from "react";
import { mediaPrefix } from "../config";

class Section extends React.Component {
  render() {
    const { children, backgroundImage } = this.props;
    const backgroundImageUrl = encodeURI(
      `${mediaPrefix}${backgroundImage.image.path}`
    );
    return (
      <section className="section slide fade-6 kenBurns selected animate">
        <div className="content">
          <div className="container">
            <div className="wrap">{children}</div>
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

export default Section;
