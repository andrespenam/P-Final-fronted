import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <NavbarComponent />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/pedido" element={<Cart />} />

            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/register" element={<Navigate to="/registro" replace />} />
            <Route path="/ingresar" element={<Navigate to="/login" replace />} />

            <Route path="/contacto" element={<Contact />} />
            <Route path="/acerca" element={<About />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;