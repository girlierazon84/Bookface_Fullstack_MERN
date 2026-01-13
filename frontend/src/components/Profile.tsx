// frontend/src/components/Profile.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { ListItemIcon, ListItemText } from "@mui/material";
import PostAddSharpIcon from "@mui/icons-material/PostAddSharp";
import routingPath from "../routes/routingPath";
import { useUserContext } from "../provider/UserProvider";
import Avatar from "./Avatar";


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AddPostLink = styled.div`
  a {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.fourthly};
    text-decoration: none;
    font-weight: 900;
    padding: 8px 10px;
    border-radius: 12px;
  }

  a:hover {
    background: ${({ theme }) => theme.colors.thirdly};
  }
`;

const ProfileWrapper = styled.section`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 12px;

  &:hover {
    background: ${({ theme }) => theme.colors.thirdly};
  }

  &:hover .profileDropdown {
    display: block;
  }
`;

const SpanUserName = styled.span`
  padding-left: 10px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: "Oleo Script", sans-serif;
  font-weight: 900;

  @media (max-width: 520px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 54px;
  right: 0;
  background-color: ${({ theme }) => theme.colors.primary};
  min-width: 190px;
  padding: 10px;
  border-radius: 14px;
  border: 1px solid rgba(97, 97, 97, 0.2);
  box-shadow: ${({ theme }) => theme.colors.card_shadow};
  z-index: 30;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.fourthly};
  text-align: left;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text_primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid rgba(97, 97, 97, 0.2);
  margin: 8px 0;
`;

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();

  return (
    <Wrapper>
      <AddPostLink>
        <Link to={routingPath.createPostView} aria-label="Add post">
          <ListItemIcon>
            <PostAddSharpIcon color="primary" fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Add Post" />
        </Link>
      </AddPostLink>

      <ProfileWrapper>
        <Avatar src={user?.avatarUrl} name={user?.username} alt="Profile avatar" size={40} />
        <SpanUserName>{user?.username}</SpanUserName>

        <Dropdown className="profileDropdown" role="menu">
          <DropdownItem role="menuitem" onClick={() => navigate(routingPath.settingsView)}>
            Settings
          </DropdownItem>
          <DropdownItem role="menuitem" onClick={() => navigate(routingPath.profileView)}>
            Profile
          </DropdownItem>
          <Hr />
          <DropdownItem
            role="menuitem"
            onClick={() => {
              logout();
              navigate(routingPath.usersLogInView, { replace: true });
            }}
          >
            <LogoutSharpIcon color="action" fontSize="small" />
            Logout
          </DropdownItem>
        </Dropdown>
      </ProfileWrapper>
    </Wrapper>
  );
};

export default Profile;
