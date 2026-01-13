// frontend/src/components/RightNav.tsx

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemText } from "@mui/material";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useUserContext } from "../provider/UserProvider";
import routingPath from "../routes/routingPath";
import Profile from "./Profile";


const Overlay = styled.aside<{ $open: boolean }>`
  @media (min-width: 769px) {
    position: static;
    background: transparent;
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    grid-template-columns: 1fr auto;
    background: rgba(0, 0, 0, ${({ $open }) => ($open ? 0.35 : 0)});
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
    transition: background 0.2s ease;
  }
`;

const Drawer = styled.div<{ $open: boolean }>`
  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  @media (max-width: 768px) {
    width: min(86vw, 360px);
    height: 100%;
    background: ${({ theme }) => theme.colors.fourthly};
    border-left: 1px solid rgba(97, 97, 97, 0.18);
    box-shadow: ${({ theme }) => theme.colors.card_shadow};
    transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
    transition: transform 0.22s ease;
    display: grid;
    grid-template-rows: auto 1fr;
  }
`;

const MobileHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid rgba(97, 97, 97, 0.18);
  }
`;

const Brand = styled.div`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: "Oleo Script", sans-serif;
  font-size: 1.25rem;
`;

const CloseBtn = styled.button`
  border: 1px solid rgba(97, 97, 97, 0.18);
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text_primary};
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 14px;
    display: grid;
    gap: 10px;
    align-content: start;
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;

  color: ${({ theme }) => theme.colors.text_primary};
  font-weight: 900;

  padding: 10px 12px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid rgba(97, 97, 97, 0.18);

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (min-width: 769px) {
    background: transparent;
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      border: 1px solid rgba(97, 97, 97, 0.18);
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RightNav: React.FC<Props> = ({ open, setOpen }) => {
  const { token } = useUserContext();

  const close = React.useCallback(() => setOpen(false), [setOpen]);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <Overlay $open={open} aria-hidden={!open} onClick={close}>
      <Drawer $open={open} onClick={stop} role="navigation" aria-label="Primary navigation">
        <MobileHeader>
          <Brand>Bookface</Brand>
          <CloseBtn type="button" onClick={close} aria-label="Close menu">
            <CloseRoundedIcon fontSize="small" />
          </CloseBtn>
        </MobileHeader>

        <Menu id="primary-navigation">
          <Item>
            <MenuLink to={routingPath.homeView} onClick={close}>
              <ListItemIcon>
                <HomeSharpIcon color="primary" fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </MenuLink>
          </Item>

          {token ? (
            <Item>
              <Profile />
            </Item>
          ) : (
            <Item>
              <MenuLink to={routingPath.usersLogInView} onClick={close}>
                <ListItemIcon>
                  <LoginSharpIcon color="action" fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Log in" />
              </MenuLink>
            </Item>
          )}
        </Menu>
      </Drawer>
    </Overlay>
  );
};

export default RightNav;
