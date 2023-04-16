import { Link, useMatch, useResolvedPath } from "react-router-dom";

function CustomLink({ to, children, ...props }: any) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

const Navbar = () => {
  return (
    <nav className="flex flex-row bg-gray-300 gap-4 justify-center mb-4">
      <Link to="/" className="site-title">
        {/* Scoreboard Website thing */}
        Home
      </Link>
      <ul>
        <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  );
};

export default Navbar;
