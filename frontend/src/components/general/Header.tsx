import Logo from '../../assets/img/logo.svg';
import Light from '../../assets/img/sun_icon.svg';
import Dark from '../../assets/img/moon_icon.svg';

const Header = () => {
  return (
    <header>
      <div className="branding">
        <img className="logo" src={Logo} alt="Logo"></img>
        <h1 className="title">RefWrite</h1>
      </div>
      <div className="nav-action">
        <ul className="nav">
          <li>Create</li>
          <li>Saved References</li>
          <li>
            More
            <div className="more-arrow" />
          </li>
          <li>Logout</li>
        </ul>
        <div className="theme-toggle">
          <img src={Light} className="toggle-opt" id="light" alt="light" />
          <label className="switch">
            <input type="checkbox" />
            <div className="slider" />
          </label>
          <img src={Dark} className="toggle-opt" id="dark" alt="dark" />
        </div>
      </div>
    </header>
  );
};

export default Header;
