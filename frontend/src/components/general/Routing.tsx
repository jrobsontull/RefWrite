import { Routes, Route } from 'react-router-dom';

import Create from '../pages/Create';

const Routing = () => {
  return (
    <Routes>
      <Route path={'/create'} element={<Create />} />
    </Routes>
  );
};

export default Routing;
