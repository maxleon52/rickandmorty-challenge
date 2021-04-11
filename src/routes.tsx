import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyEpisodes from './pages/MyEpisodes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/my-episodes" component={MyEpisodes} />
    </Switch>
  );
}

export default Routes;
