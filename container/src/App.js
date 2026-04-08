import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";

const MarketingLazy = lazy(() => import("./components/MarketingApp"));
const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));
export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <Header setIsSignedIn={setIsSignedIn} signedIn={isSignedIn} />
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth">
            <AuthLazy setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
          </Route>
          <Route path="/dashboard">
            {!isSignedIn ? (
              <AuthLazy setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
            ) : (
              <DashboardLazy />
            )}
          </Route>
          <Route path="/">
            {isSignedIn ? (
              <MarketingLazy />
            ) : (
              <AuthLazy setIsSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
            )}
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
