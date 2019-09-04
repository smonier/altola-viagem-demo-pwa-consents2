# Viagem Demo App

## Pre-requisites
1. node.js LTS version installed
1. `npm` installed
1. Jahia DX instance configured with the Viagem module deployed into it.
    > The project with the module is located in this separate [repo](https://github.com/Jahia/Altola-PWA-Demo-Project).

## Getting started

1. `npm install`
1. Create `.env` file next to `package.json` file.
1. Add the following environment variables:
    ```
        REACT_APP_DX_HOST=<your Jahia DX host>
        REACT_APP_UNOMI_HOST=<your Unomi host>
        REACT_APP_REVIEWS_HOST=<host of the Yelp API proxy>
        REACT_APP_REGISTRATION_HOST=<Jahia DX host>/sites/<viagem site key>/home.newViagemUser.do
        REACT_APP_SITE_KEY=<the site key for the web project that contains the viagem content>
        INLINE_RUNTIME_CHUNK=false
    ```

    > Unless you want to run a local Yelp API proxy, use the following heroku instance for the time being: https://viagem-api.herokuapp.com
1. Check the value of `config.dxSiteKey` in `config.js` if it matches the name of your project in Jahia, may need to update that value. This value should also match the `<viagem site key>` value in the `REACT_APP_REGISTRATION_HOST` environment variable above.
1. `npm start`
1. The app is expected to start on `http://localhost:3000`.