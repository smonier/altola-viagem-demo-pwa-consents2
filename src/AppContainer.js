import React from "react";
import { Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { ApolloProvider } from "react-apollo";
import { withRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import App from "./App";
import ExperiencePage from "./components/Experience/ExperiencePage";
import ExperienceCategoryPage from "./components/ExperienceCategory/ExperienceCategoryPage";
import Navigation from "./components/Navigation";
import { NavigationProvider } from "./contexts/NavigationContext";
import unomiTracker from "unomi-analytics";
import { config } from "./config";
import Loading from "./components/Loading";
import { ToastContainer } from 'react-toastify';

unomiTracker.initialize({
  "Apache Unomi": {
    scope: config.dxSiteKey,
    url: config.unomiHost,
    timeoutInMilliseconds: 2500
  }
});

// this helps kick off .onready callback
unomiTracker.page("/index.html");

class AppContainer extends React.Component {
  state = {
    previousPage: "/",
    profileId: null,
    sessionId: null
  };

  static getDerivedStateFromProps(props, state) {
    const location = props.history.location;
    const path = location.pathname + location.hash;
    if (
      path !== state.previousPage &&
      !location.pathname.startsWith("/experience") &&
      !location.pathname.startsWith("/category")
    ) {
      return {
        previousPage: path
      };
    }
    return null;
  }

  componentDidMount() {
    unomiTracker.ready(() => {
      console.log(
        `AppContainer: profileId: ${window.cxs.profileId}, sessionId=${
          window.cxs.sessionId
        }`
      );
      if (!window.cxs.profileId || !window.cxs.sessionId) {
        console.error("unomi wasn't initialized");
        return;
      }
      this.setState({
        profileId: window.cxs.profileId,
        sessionId: window.cxs.sessionId
      });
    });
  }

  render() {
    const { client, isEditing } = this.props;
    const { profileId, sessionId } = this.state;
    if (!profileId || !sessionId) {
      console.warn("unomi profile or session are unavailable");
      return <Loading />;
    }

    return (
      <CookiesProvider>
        <ApolloProvider client={client}>
          <NavigationProvider value={this.state.previousPage}>
            <Navigation isEditing={isEditing} />
            <ToastContainer autoClose={3000} position="top-center" />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <App
                    {...props}
                    tracker={unomiTracker}
                    isEditing={isEditing}
                    profileId={profileId}
                    sessionId={sessionId}
                  />
                )}
              />
              <Route
                path="/category/:path"
                render={props => (
                  <ExperienceCategoryPage
                    {...props}
                    tracker={unomiTracker}
                    isEditing={isEditing}
                    profileId={profileId}
                    sessionId={sessionId}
                  />
                )}
              />
              <Route
                path="/experience/:path"
                render={props => (
                  <ExperiencePage
                    {...props}
                    tracker={unomiTracker}
                    isEditing={isEditing}
                    profileId={profileId}
                    sessionId={sessionId}
                  />
                )}
              />
              <Route key="/null" path="/null" component={null} />
              <Route component={NotFound} />
            </Switch>
          </NavigationProvider>
        </ApolloProvider>
      </CookiesProvider>
    );
  }
}

export default withRouter(AppContainer);