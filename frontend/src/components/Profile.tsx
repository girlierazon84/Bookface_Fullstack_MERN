// frontend/src/components/Profile.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PostAddSharpIcon from "@mui/icons-material/PostAddSharp";
import Avatar from "./Avatar";
import routingPath from "../routes/routingPath";
import { useUserContext } from "../provider/UserProvider";


const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  border: 1px solid rgba(97, 97, 97, 0.18);
  background: transparent;
  border-radius: 14px;
  padding: 6px 10px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.secondary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 3px;
  }
`;

const Name = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: "Oleo Script", sans-serif;
  font-weight: 900;

  @media (max-width: 520px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 10px);

  width: 220px;
  padding: 10px;
  border-radius: 16px;

  background: ${({ theme }) => theme.colors.fourthly};
  border: 1px solid rgba(97, 97, 97, 0.18);
  box-shadow: ${({ theme }) => theme.colors.card_shadow};

  display: grid;
  gap: 8px;
  z-index: 80;
`;

const Item = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 12px;
  border-radius: 14px;

  border: 1px solid rgba(97, 97, 97, 0.16);
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text_primary};

  font-weight: 900;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid rgba(97, 97, 97, 0.18);
  margin: 6px 0;
`;

const Pop = styled.div`
  position: relative;
`;

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-profile-pop]")) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <Pop data-profile-pop>
      <Button type="button" onClick={() => setOpen((p) => !p)} aria-haspopup="menu" aria-expanded={open}>
        <Avatar src={user?.avatarUrl} name={user?.username} alt="Profile avatar" size={40} />
        <Name>{user?.username}</Name>
      </Button>

      {open ? (
        <Dropdown role="menu" aria-label="Profile menu">
          <Item role="menuitem" onClick={() => go(routingPath.createPostView)}>
            <PostAddSharpIcon fontSize="small" />
            Create post
          </Item>

          <Item role="menuitem" onClick={() => go(routingPath.profileView)}>
            <PersonRoundedIcon fontSize="small" />
            Profile
          </Item>

          <Item role="menuitem" onClick={() => go(routingPath.settingsView)}>
            <SettingsRoundedIcon fontSize="small" />
            Settings
          </Item>

          <Hr />

          <Item
            role="menuitem"
            onClick={() => {
              logout();
              setOpen(false);
              navigate(routingPath.usersLogInView, { replace: true });
            }}
          >
            <LogoutRoundedIcon fontSize="small" />
            Logout
          </Item>
        </Dropdown>
      ) : null}
    </Pop>
  );
};

export default Profile;
