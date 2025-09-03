import { Brain } from "./pages/Brain";
import Dashboard from "./pages/Dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { Bounce, ToastContainer } from 'react-toastify';

function App() {
  return <HashRouter>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/brain/:hash" element={<Brain />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  </HashRouter>
}

export default App
