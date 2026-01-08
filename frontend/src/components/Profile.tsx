// frontend/src/components/Profile.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import { ListItemIcon, ListItemText } from "@mui/material";
import PostAddSharpIcon from "@mui/icons-material/PostAddSharp";

import RoutingPath from "../routes/RoutingPath";
import { useUserContext } from "../utils/global/provider/UserProvider";


const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserContext();

  return (
    <Wrapper>
      <AddPostLink>
        <Link to={RoutingPath.createPostView}>
          <ListItemIcon>
            <PostAddSharpIcon color="primary" fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Add Post" />
        </Link>
      </AddPostLink>

      <ProfileWrapper>
        <Img src={user?.avatarUrl || "https://thispersondoesnotexist.com/image"} alt="Profile avatar" />
        <SpanUserName>{user?.username}</SpanUserName>

        <Dropdown className="profileDropdown">
          <DropdownItem onClick={() => navigate(RoutingPath.settingsView)}>Settings</DropdownItem>
          <DropdownItem onClick={() => navigate(RoutingPath.profileView)}>Profile</DropdownItem>
          <Hr />
          <DropdownItem
            onClick={() => {
              logout();
              navigate(RoutingPath.usersLogInView, { replace: true });
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

/* styles unchanged from your version */
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
    color: var(--fourthly-color);
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    border-bottom: 3px solid var(--secondary-color);
  }

  @media (max-width: 768px) {
    a:hover {
      border-bottom: none;
      text-decoration: underline;
    }
  }
`;

const ProfileWrapper = styled.section`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:hover .profileDropdown {
    display: block;
  }
`;

const Img = styled.img`
  border-radius: 50%;
  width: 3.5em;
  border: 1px solid var(--thirdly-color);
`;

const SpanUserName = styled.span`
  padding-left: 10px;
  color: var(--secondary-color);
  font-family: "Oleo Script", sans-serif;
  font-weight: bold;
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 60px;
  right: 0;
  background-color: var(--thirdly-color);
  min-width: 170px;
  padding: 12px 10px;
  border-radius: 10px;
  z-index: 10;
`;

const DropdownItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;

  &:hover {
    background: var(--fifthly-color);
  }
`;

const Hr = styled.hr`
  border: 1px solid var(--fifthly-color);
  margin: 8px 0;
`;
