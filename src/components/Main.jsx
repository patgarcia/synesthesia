import Search from './Search';
import { Route } from 'react-router-dom';
import DepartmentDetails from './MET/DepartmentDetails';
import ArtObjSharing from './MET/ArtObjSharing';

const Main = () => {

  return (
    <main>
      <Route exact path="/" component={ Search } />
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