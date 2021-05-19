
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Join from "./components/login/join";
import Setup from "./components//setup/userpermission";
import Session from "./components/call/session";
function Main() {

  return (
    <BrowserRouter>
      <Route exact path="/" component={Join} />
      <Route path="/setup" component={Setup}/>
      <Route path="/session" component={Session}/>
    </BrowserRouter>
  );
}

export default Main;
