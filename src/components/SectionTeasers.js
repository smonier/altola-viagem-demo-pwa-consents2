import React from "react";
import TeaserItem from "./TeaserItem";

const getColSize = length => {
  if (length >= 6) {
    return 2;
  }
  if (length >= 4) {
    return 3;
  }
  if (length >= 3) {
    return 4;
  }
  return 6;
};

const SectionTeasers = ({ teasers, isEditing }) =>
  teasers &&
  teasers.items && (
    <div className="fix-12-12 margin-top-3">
      <ul className="flex fixedSpaces later left">
        {teasers.items.map((item, index) => (
          <TeaserItem
            key={index}
            {...item}
            isEditing={isEditing}
            size={getColSize(teasers.items.length)}
          />
        ))}
      </ul>
    </div>
  );

export default SectionTeasers;
