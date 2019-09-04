import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import ExperienceCategoryIntroSection from "./ExperienceCategoryIntroSection";
import { config } from "../../config";
import "../../fullpage.css";

const anchors = ["intro"];

class ExperienceCategoryPage extends React.Component {
  render() {
    const sectionProps = this.props;
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
                <ExperienceCategoryIntroSection {...sectionProps} />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    );
  }
}

export default ExperienceCategoryPage;
