import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { Route, Router, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

const generateClassName = createGenerateClassName({
  productionPrefix: "ma",
});

export default ({ history }) => {
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </StylesProvider>
    </Router>
  );
};
