import { Routes, Route } from 'react-router-dom';

import Create from './Create';
import Home from './Home';
import Login from './Login';

const Routing = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/create'} element={<Create />} />
    </Routes>
  );
};

export default Routing;
