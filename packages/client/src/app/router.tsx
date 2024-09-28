import { Routes, Route } from 'react-router-dom';
import * as Pages from '@/pages';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={<Pages.Home />}
      >
        <Route
          path='room/edit/:id'
          element={<Pages.EditRoom />}
        />
        <Route
          path='room/access/:id'
          element={<Pages.AccessRoom />}
        />
      </Route>
      <Route
        path='/auth/kakao'
        element={<Pages.AuthKakao />}
      />
      <Route
        path='/room/:id'
        element={<Pages.Room />}
      />
    </Routes>
  );
};

export default Router;
