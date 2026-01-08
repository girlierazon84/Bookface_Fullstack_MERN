// frontend/src/components/nav/RightNav.tsx

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";

import { useUserContext } from "../../utils/global/provider/UserProvider";
import Profile from "../Profile";
import RoutingPath from "../../routes/RoutingPath";


type Props = { open: boolean };

const RightNav: React.FC<Props> = ({ open }) => {
  const { token } = useUserContext();

  return (
    <Ul open={open}>
      <Li>
        <Link to={RoutingPath.homeView}>
          <ListItemIcon>
            <HomeSharpIcon color="primary" fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </Link>
      </Li>

      {token ? (
        <Li>
          <Profile />
        </Li>
      ) : (
        <Li>
          <Link to={RoutingPath.usersLogInView}>
            <ListItemIcon>
              <LoginSharpIcon color="action" fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Log in" />
          </Link>
        </Li>
      )}
    </Ul>
  );
};

export default RightNav;

/* styles mostly same */
const Ul = styled.ul<Props>`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;
  margin: 0;
  padding: 0;

  a {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--fourthly-color);
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    border-bottom: 3px solid var(--secondary-color);
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: var(--fifthly-color);
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: min(80vw, 320px);
    padding: 4.5rem 1.5rem 1.5rem;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    transition: transform 0.25s ease-in-out;

    a:hover {
      border-bottom: none;
      text-decoration: underline;
    }
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;
