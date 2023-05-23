import React, { useEffect } from 'react';
import { RoutesList } from "./routerList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 9 && event.shiftKey) {
        event.preventDefault();
        window.history.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <>
      <RoutesList />
      <ToastContainer />
    </>
  );
}

export default App;
