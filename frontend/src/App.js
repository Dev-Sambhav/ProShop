import { Header, Footer } from "./components";
import "./App.css";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
    </>
  );
}

export default App;
