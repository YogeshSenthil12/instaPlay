import React from "react";
import RootLayout from "./Containers/Routes/RootLayout";
import {ToastContainer} from "react-toastify";

const App = () => {
  return (
    <div>
      <RootLayout />
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
