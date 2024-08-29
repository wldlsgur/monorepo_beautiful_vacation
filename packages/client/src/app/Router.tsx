import { Routes, Route } from 'react-router-dom';
import * as Pages from '@/pages';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Pages.Home />}
      />
    </Routes>
  );
};

export default Router;
