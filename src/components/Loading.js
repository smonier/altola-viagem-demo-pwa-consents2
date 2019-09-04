import React from "react";
import loadingGif from "../assets/loading.gif";

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.showReload = this.showReload.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.state = {
      showReload: false,
      showLoading: false
    };

    this.reloadButtonTimer = setTimeout(
      this.showReload,
      this.props.reloadButtonTimeout
    );
    this.loadingTimer = setTimeout(this.showLoading, this.props.showTimeout);
  }

  componentWillUnmount() {
    clearTimeout(this.reloadButtonTimer);
    clearTimeout(this.loadingTimer);
  }

  showReload() {
    this.setState({ showReload: true });
  }

  showLoading() {
    this.setState({ showLoading: true });
  }

  render() {
    const { showReload, showLoading } = this.state;

    if (!showLoading) {
      return null;
    }

    const reloadButton = showReload ? (
      <button
        onClick={() => window.location.reload()}
        className="btn button blue reload-button"
      >
        Reload manually
      </button>
    ) : null;

    return (
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <img src={loadingGif} alt="Loading"/>
            {reloadButton}
          </div>
        </div>
      </div>
    );
  }
}

Loading.defaultProps = {
  reloadButtonTimeout: 3000,
  showTimeout: 250
};

export default Loading;
