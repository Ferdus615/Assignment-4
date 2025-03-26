import Navbar from "./Navbar";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="container mt-4">{children}</main>
  </>
);

export default Layout;
