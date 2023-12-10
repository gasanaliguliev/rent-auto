import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";


export const  HeaderContainer = styled.div `
display: flex;
align-items: center;
max-width: 1280px;
padding-left: 20px;
padding-right: 20px; 
padding-top: 20px;
padding-bottom: 20px;

`

export const  Nav = styled.div `
margin: 0 auto;
display: flex;
gap: 70px;
`
export const   NavLinkStyled = styled(NavLink) `
color: #111;
`
export const Image = styled.img `
`