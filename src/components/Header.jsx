import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Departments from './MET/Departments';

const Header = () => {

  const [ showingMenu, setShowingMenu ] = useState(false)
  const toggleMenu = () => {
    document.body.style.overflow = (!showingMenu ? "hidden" : "auto")
    setShowingMenu(!showingMenu);
  }
  return (
    <header>
      <Link to="/">
        <h2>Synesthesia</h2>
      </Link>
        <p onClick={ toggleMenu } className="dept-link">Departments</p>
        <Departments toggleMenu={toggleMenu} showingMenu={showingMenu} setShowingMenu={setShowingMenu} />
    </header>
  );
};

export default Header;