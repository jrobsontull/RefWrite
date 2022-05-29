const Header = () => {
  return (
    <div className="header">
      <div className="branding">
        <img className="logo" src=""></img>
        <h1 className="title">RefWrite</h1>
      </div>
      <ul className="nav">
        <li>Create</li>
        <li>Saved References</li>
        <li>More</li>
        <li>Logout</li>
      </ul>
      <div className="dark-mode">DARK</div>
    </div>
  );
};

export default Header;
