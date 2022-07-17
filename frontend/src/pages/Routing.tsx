import { Routes, Route } from 'react-router-dom';

import Create from './Create';
import Home from './Home';
import Login from './Login';
import Register from './Register';

const Routing = (): JSX.Element => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/create'} element={<Create />} />
      <Route path={'/register'} element={<Register />} />
    </Routes>
  );
};

export default Routing;
