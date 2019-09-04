import React from "react";
import { mediaPrefix } from "../config";
import { NavLink } from "react-router-dom";
import EditButton from "./EditButton";

const getText = html => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

const TeaserItem = ({
  name,
  title,
  text,
  image,
  size,
  type,
  isEditing,
  path
}) => {
  let teaserLink = "";
  if (type && type.name) {
    teaserLink =
      type.name === "vnt:experienceCategory"
        ? `/category/${name}`
        : `/experience/${name}`;
  }
  const teaserImage = image && image.path && (
    <img
      width="300px"
      src={`${mediaPrefix}${image.path.path}`}
      alt={name}
    />
  );
  return (
    <li className={`col-${size}-12 col-tablet-1-2 col-phone-1-2`}>
      <div style={{ position: "relative" }}>
        <EditButton
          isEditing={isEditing}
          path={path}
          typeName={type.name}
          style={{ position: "absolute", top: 0, right: -5, zIndex: 1000 }}
        />
        <NavLink
          to={teaserLink}
          className="button rounded empty margin-bottom-2 ae-3"
        >
          {teaserImage}
        </NavLink>
      </div>
      <h5 className="ae-4 padding-bottom-1" dangerouslySetInnerHTML={{ __html: title.value }} />
      {getText(text.value) !== "" && (
        <div className="ae-5">
          <p
            className="tiny opacity-6"
            dangerouslySetInnerHTML={{ __html: text.value }}
          />
        </div>
      )}
    </li>
  );
};

export default TeaserItem;
