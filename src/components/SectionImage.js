import React from "react";
import { mediaPrefix } from "../config";

const SectionImage = ({ sectionImage }) =>
sectionImage && (
    <div className="fix-3-12">
      <img
        alt="section"
        src={`${mediaPrefix}${sectionImage.image.path}`}
        className="ae-1 fromCenter"
      />
    </div>
  );

export default SectionImage;
