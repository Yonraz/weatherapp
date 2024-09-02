import "./Layout.css";
import logo from "../../../public/logo.svg";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <img src={logo} alt="fintek logo" className="logo" />
      {children}
    </>
  );
};
export default Layout;
