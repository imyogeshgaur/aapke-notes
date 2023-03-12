import { Suspense } from 'react';
import {useRoutes} from 'react-router'
import allRoutes from './routes';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const routes = useRoutes(allRoutes)
  return (
    <>
      <Suspense fallback={
      <h1 
        className='text-center font-bold'
      >
        Loading...
      </h1>
      }>
        {routes}
      </Suspense>
    </>
  );
};

export default App;
