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


// Props definition for RightNav component
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

// Right-side navigation component
const RightNav: React.FC<Props> = ({ open, setOpen }) => {
  // Get user token from context
  const { token } = useUserContext();

  // Close on Escape
  React.useEffect(() => {
    // only attach listener if drawer is open
    if (!open) return;

    // handle keydown events
    const onKeyDown = (e: KeyboardEvent) => {
      // close drawer on Escape
      if (e.key === "Escape") setOpen(false);
    };

    // attach and clean up event listener
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  // Function to close the drawer
  const close = () => setOpen(false);

  return (
    <Panel
      $open={open}
      aria-hidden={!open}
      role="dialog"
      aria-modal={open ? "true" : undefined}
      onClick={close} // clicking overlay closes drawer
    >
      <Menu
        id="primary-navigation"
        $open={open}
        onClick={(e) => e.stopPropagation()} // prevent overlay-close when clicking inside menu
      >
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
            {/* Profile likely uses useNavigate -> must be inside Router (it is now via index.tsx) */}
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


/**---------------------------------------------------------------
    styled-components: use $open to avoid passing props to DOM
------------------------------------------------------------------*/
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
    color: var(--fourthly-color);
    text-decoration: none;
    font-weight: 900;
    padding: 8px 10px;
    border-radius: 12px;
  }

  a:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    height: 100%;
    width: min(82vw, 340px);
    background: white;
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
