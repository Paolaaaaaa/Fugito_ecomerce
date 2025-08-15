import React from 'react';
import { Suspense } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';



export default function AppRouting() {
  const AngularAutho = React.lazy(() => import('login_app/Autho'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Cargando login de Angular...</div>}>
              <AngularAutho />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
