import "./Layout.css";
import logo from "../../../public/logo.svg";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <img src={logo} alt="fintek logo" className="logo" />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
