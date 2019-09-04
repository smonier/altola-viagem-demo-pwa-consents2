import React from "react";

const NavigationContext = React.createContext({});

export const NavigationProvider = NavigationContext.Provider;
export const NavigationConsumer = NavigationContext.Consumer;