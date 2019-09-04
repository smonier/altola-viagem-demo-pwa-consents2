import React, { Fragment, Component } from "react";
import EditButton from "../EditButton";
import BackButton from "../BackButton";
import { getImageUrl, getFeaturedImageUrl } from "../../utils";

class ExperienceIntroSection extends Component {
  render() {
    const {
      description,
      vendorName,
      backgroundImage,
      path,
      type,
      images,
      isEditing
    } = this.props;

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
                      dangerouslySetInnerHTML={{ __html: vendorName.value }}
                    />
                    <p className="ae-2 fromLeft">
                      <span
                        className="opacity-8"
                        dangerouslySetInnerHTML={{ __html: description.value }}
                      />
                    </p>
                    {/* <a
                      href="#reviews"
                      className="button blue gradient crop ae-3 fromCenter"
                    >
                      Reviews
                    </a> */}
                  </li>
                  <li className="col-6-12 cell-16">
                    <ul className="grid">
                      <BackButton />
                      <li className="col-11-12 toRight">
                        <div className="videoThumbnail rounded shadow ae-4 fromCenter popupTrigger">
                          <img
                            className=""
                            src={getFeaturedImageUrl(images)}
                            alt={vendorName.value}
                          />
                          <EditButton
                            isEditing={isEditing}
                            path={path}
                            typeName={type.name}
                            style={{
                              position: "absolute",
                              top: 0,
                              right: -5,
                              zIndex: 1000
                            }}
                          />
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className="background"
          style={{ backgroundImage: `url(${getImageUrl(backgroundImage)})` }}
        />
      </Fragment>
    );
  }
}

export default ExperienceIntroSection;
