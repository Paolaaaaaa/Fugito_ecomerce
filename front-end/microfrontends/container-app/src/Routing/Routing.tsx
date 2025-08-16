import React from 'react';
import { Suspense } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';



export default function AppRouting() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Cargando login de Angular...</div>}>
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
