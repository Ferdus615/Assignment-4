import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { Container } from "react-bootstrap";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  );
}
