// frontend/src/components/nav/RightNav.tsx

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { useUserContext } from "../provider/UserProvider";
import Profile from "./Profile";
import RoutingPath from "../routes/RoutingPath";


/**-------------------------------------------------------------------------
    styled-components: use transient $open to avoid passing props to DOM
----------------------------------------------------------------------------*/
const Panel = styled.aside<{ $open: boolean }>`
  /* desktop: inline */
  @media (min-width: 769px) {
    position: static;
  }

  /* mobile drawer overlay */
  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    z-index: 40;

    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    background: rgba(0, 0, 0, ${({ $open }) => ($open ? 0.28 : 0)});

    display: flex;
    justify-content: flex-end;
    transition: background 0.25s ease;
  }
`;

const Menu = styled.ul<{ $open: boolean }>`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;

  a {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    font-weight: 900;
    padding: 8px 10px;
    border-radius: 12px;
  }

  a:hover {
    background: ${({ theme }) => theme.colors.fourthly};
  }

  @media (max-width: 768px) {
    height: 100%;
    width: min(82vw, 340px);
    background: ${({ theme }) => theme.colors.primary};
    border-left: 1px solid rgba(97, 97, 97, 0.2);

    padding: 90px 14px 14px;
    display: grid;
    gap: 8px;
    align-content: start;

    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 0.25s ease;
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

// Right navigation panel component export
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Right navigation panel component export
const RightNav: React.FC<Props> = ({ open, setOpen }) => {
  // Get user token from context to determine logged-in state
  const { token } = useUserContext();

  // Handlers to close nav and stop propagation
  const close = () => setOpen(false);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Panel $open={open} aria-hidden={!open} onClick={close}>
      <Menu id="primary-navigation" $open={open} onClick={stop} role="menu">
        <Li>
          <Link to={RoutingPath.homeView} onClick={close}>
            <ListItemIcon>
              <HomeSharpIcon color="primary" fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </Link>
        </Li>

        {token ? (
          <Li>
            {/* If Profile navigates, it now has Router context + nav closes on route change */}
            <Profile />
          </Li>
        ) : (
          <Li>
            <Link to={RoutingPath.usersLogInView} onClick={close}>
              <ListItemIcon>
                <LoginSharpIcon color="action" fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="Log in" />
            </Link>
          </Li>
        )}
      </Menu>
    </Panel>
  );
};

export default RightNav;
