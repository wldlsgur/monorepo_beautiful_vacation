import { Routes, Route } from 'react-router-dom';
import * as Pages from '@/pages';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Pages.Layout />}
      >
        <Route
          index
          element={<Pages.Home />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
