// frontend/src/components/RightNav.tsx

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { useUserContext } from "../provider/UserProvider";
import routingPath from "../routes/routingPath";
import Profile from "./Profile";


/**-------------------------------------------------------------------------
    styled-components: use transient props ($open) to avoid passing to DOM
----------------------------------------------------------------------------*/
const Panel = styled.aside<{ $open: boolean }>`
  @media (min-width: 769px) {
    position: static;
    inset: auto;
    background: transparent;
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    z-index: 40;

    display: flex;
    justify-content: flex-end;

    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    background: rgba(0, 0, 0, ${({ $open }) => ($open ? 0.28 : 0)});
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
    text-decoration: none;

    color: ${({ theme }) => theme.colors.secondary};
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

    a {
      padding: 10px 12px;
    }
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RightNav: React.FC<Props> = ({ open, setOpen }) => {
  const { token } = useUserContext();

  const close = () => setOpen(false);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Panel $open={open} aria-hidden={!open} onClick={close}>
      <Menu id="primary-navigation" $open={open} onClick={stop} role="menu" aria-label="Primary navigation">
        <Li>
          <Link to={routingPath.homeView} onClick={close}>
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
            <Link to={routingPath.usersLogInView} onClick={close}>
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
