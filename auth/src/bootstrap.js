import { createBrowserHistory, createMemoryHistory } from "history";
import ReactDOM from "react-dom";
import App from "./App";
//Mount function to start up the app
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  console.log("Mounting initial Path ", initialPath);

  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });
  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  return {
    onParentNavigate(location) {
      const { pathname } = history.location;
      console.log("Container navigated to auth", location);
      if (pathname !== location.pathname) {
        history.push(location.pathname);
      }
    },
  };
};

//If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

//We are running through container
//and we should export the mount function
export { mount };
