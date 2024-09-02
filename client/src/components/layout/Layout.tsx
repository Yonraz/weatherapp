import "./Layout.css";
import logo from "../../../public/logo.svg";

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <img src={logo} alt="fintek logo" className="logo" />
      {children}
    </div>
  );
};
export default Layout;
