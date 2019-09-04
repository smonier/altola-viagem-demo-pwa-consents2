import React from "react";

const SectionText = ({ text }) => (
  <p className="ae-2">
    <span
      className="opacity-8"
      dangerouslySetInnerHTML={{
        __html: text ? text.value : null
      }}
    />
  </p>
);

export default SectionText;
