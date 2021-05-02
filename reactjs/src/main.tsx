
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Welcome from './components/welcome';
function Main() {

  

  return (
    <BrowserRouter>
      {/*<Login/> NO LOGIN YET
      <Route exact path="/register" component={Register} />*/}
      <Route exact path="/" component={Welcome} />
    </BrowserRouter>
  );
}

export default Main;
