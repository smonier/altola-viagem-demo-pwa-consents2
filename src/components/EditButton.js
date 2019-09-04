import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import EditIcon from "./icons/EditIcon";

class EditButton extends Component {
  constructor(props) {
    super(props);
    this.launchEdit = this.launchEdit.bind(this);
  }

  launchEdit() {
    if (window.parent && window.parent.authoringApi) {
      const { path, typeName } = this.props;
      console.log({ path });
      console.log({ typeName });
      window.parent.authoringApi.editContent(
        path,
        "",
        ["vnt:content"],
        [typeName]
      );
    }
  }

  render() {
    const { isEditing, style } = this.props;
    const hideWhenNotEditing = {
      display: isEditing ? "inline-block" : "none"
    };

    return (
      <button
        className="button small cropBottom"
        style={{ ...style, ...hideWhenNotEditing }}
        onClick={this.launchEdit}
        type="button"
      >
        <EditIcon />
      </button>
    );
  }
}

EditButton.defaultProps = {
  isEditing: false,
  style: {
    position: "absolute",
    top: 10,
    left: -5,
    padding: 7,
    zIndex: 100
  }
};

export default withRouter(EditButton);
