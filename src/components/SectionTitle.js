import React from "react";

const SectionTitle = ({ title }) => (
  <h1 className="ae-1">{title ? title.value : null}</h1>
);

export default SectionTitle;
