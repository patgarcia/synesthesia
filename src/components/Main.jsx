import Intro from './Intro';
import { Route } from 'react-router-dom';
import DepartmentDetails from './MET/DepartmentDetails';
import ArtObjSharing from './MET/ArtObjSharing';
import Synesthesia from './Synesthesia';

const Main = () => {

  return (
    <main>
      <Route exact path="/" component={ Intro } />
      <Route path="/s/:id" render={ routerprops => (
        <Synesthesia match={ routerprops.match } />
      )} />
      <Route exact path="/art-object/:id" render={ routerprops => (
        <ArtObjSharing match={ routerprops.match } />
      )} />
      <Route path="/d/:dept" render={ routerprops => (
        <DepartmentDetails match={ routerprops.match } />
      )} />
    </main>
  );
};

export default Main;