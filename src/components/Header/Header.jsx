import { HeaderContainer, Nav, NavLinkStyled, Image } from "./Header.styled";
import icon from "../../images/header-icon.png";


const Header = () => {
  return (
    
    <HeaderContainer>
      <Image src={icon} alt="car-icon" width={100} />
      <Nav>
        <NavLinkStyled to="/">Home</NavLinkStyled>
        <NavLinkStyled to="/catalog">Catalog</NavLinkStyled>
        <NavLinkStyled to="/favorite">Favorite</NavLinkStyled>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
