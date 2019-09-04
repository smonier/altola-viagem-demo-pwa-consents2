import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const Navigation = ({ history, isEditing }) => {
  const { location } = history;
  const hidden =
    location.pathname === "/" &&
    (location.hash === "#home" || location.hash === "");

  let logoLink = null;
  if (!hidden) {
    const logo = (
      <img
        alt="Viagem"
        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAA8NJREFUWAm9lj1vE0EQhkM+oIAS0RCEkCIcREHDX6BPAR0FHQUSSgN1KkSFhKAPfwWkQEEZGSqkIJAJASERiw8b28f7zs27Gt/5crYTZ6T1zu3Ozj47O7vrubkpJMuykxyGemWQZW9QU16jrHi79U/herIhmFAgq9D3USj/8ir7ibpxLECYaBTIXwfpeL3f6XRWZwpUAdJ1AFX6nh3QmCAlIDQcbYQmBJkd0JQgJaBD55BA6GgwGLR9hj+ocZprhTZ9FEtuHz/dlsFJOjUBJBL04kfUYU+QCKzTxmtgMiAMSCDQFRGo2TuUGyjf+QHRycm/8l9Gw0D6/f596I+9kxGljH/KYBxBdKHRyQ7KOb87rmLx6otABGHJALKuqxSfz9kG+Z1XdlEeHCEYVoF8Rt9pB7GaeYS2CBS35p7bLgWfm9Ap9UAwGgWiG5V7vlacoABkzwEictftFjFmyfULiOR7fFMIXZ1D6BwFovBb2OkFcrMIhLYG0pXvUdbr9e4EEPk8j64v7IcQWIl/IFA8vgIxD8EBJ7wVgLTy67C57e0L0NUeQehTIF+hU2weRK3d6eSnjH8DGihx/2lYFDkqAi0SgoIBBFlwfRmTKCIRZGtjY2Medk98ghihxlzYT+WI25WqBISeuGV0zhyZd5BL0D+hUAiirX4F3aLmdk9pALFjj2RqckWUOpDcKg+1OQ9bpvwwGCzurRv/0iDUvXa7ravBTiSBYNt0GwNiAy8zSh1QPL42IAKhwWC63e416D/MYDgyL9FWGRn0bY+bM4yGRQSTrUNXiKFmMamVM8V7yLYYC9+C/QlcAcoZBYA5e5nRIlBxMJqSEMKcQXloA/IxL5LFMJBtW+Eeikm86+MSCG3NLzqqBnMMt8YEq3nAAfjgzWqnCG0JKGxZvHnjSeWCdAjSKRII+oyDE4wCEjm6M3trUMd7ZBnf2+yECDqeMt03V7A9H3Mzs5Pf6kcTxgaEOm5ZBkff9vb2znhU9EYRRPdIXDHnFNAp6PK5yQ5IeptKEbF9Cj8wHhUhvsIfWq3WWQe6CLsWCkWrpK4toG5J7fbP2ACZ/m+EJ2D6PwOgJk4Sr/4dcz0M4k1DQGsY88g7JgdRkOAgRQjblIA0I+oYhdBsql0BobE6WTVhXQ1no4C4LUrWMF9JtQsSC7Ft5IJqc2RcIEwVk9pe29L05QblU/WpqQMo9mOOFCHoda+7kARM+4P/YhYnrPsWEB2j1AHNDkSgYwLNHqQGSLmh+ui3RgDFuiJCxw8isACEP+T5P3/UzcMe3//qgr2As7VNtwAAAABJRU5ErkJggg=='
      />
    );
    logoLink = (
      <a href="#home" title="Viagem">
        {logo}
      </a>
    );

    if (location.pathname !== "/") {
      logoLink = (
        <NavLink to="/" title="Viagem">
          {logo}
        </NavLink>
      );
    }
  }

  return (
    <nav className="panel top">
      <div className="sections">
        <div className="left" />
        <div className="center">{logoLink}</div>
        <div className="right" />
      </div>
    </nav>
  );
};

export default withRouter(Navigation);
