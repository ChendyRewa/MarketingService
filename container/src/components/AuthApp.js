import { mount } from "auth/AuthApp";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export default ({ setIsSignedIn, isSignedIn }) => {
  const ref = useRef(null);
  const history = useHistory();
  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: isSignedIn ? history.location.pathname : "/auth/signin",
      onNavigate: (location) => {
        const { pathname } = history.location;
        if (pathname !== location.pathname) {
          history.push(location.pathname);
        }
      },
      onSignIn: () => {
        setIsSignedIn(true);
        history.push("/dashboard");
      },
    });

    history.listen(onParentNavigate);
  }, []);
  return <div ref={ref} />;
};
