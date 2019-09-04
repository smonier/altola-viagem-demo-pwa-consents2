import React from "react";

const SectionCta = ({ ctaText, ctaLink }) =>
  ctaText && (
    <a
      href={`${ctaLink.value}`}
      className="button blue gradient cropBottom popupTrigger ae-2 fromCenter margin-top-3"
      dangerouslySetInnerHTML={{
        __html: ctaText.value
      }}
    />
  );

export default SectionCta;
