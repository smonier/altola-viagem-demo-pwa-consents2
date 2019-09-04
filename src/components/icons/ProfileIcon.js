import React from "react";

const ProfileIcon = ({ selected, children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style={{ enableBackground: "new 0 0 512 512" }}
    xmlSpace="preserve"
    width="50px"
    height="50px"
    className={`${selected ? "profile-icon-selected" : "profile-icon"}`}
  >
    {children}
  </svg>
);

export default ProfileIcon;
