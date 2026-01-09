// frontend/src/components/FooterContainer.tsx

import styled from "styled-components";
import logo from "../utils/images/logo.png";
import CopyrightIcon from "@mui/icons-material/Copyright";


export default function FooterContainer() {
  return (
    <Footer>
      <Inner>
        <img src={logo} alt="Bookface logo" />
        <Meta>
          <Creator>
            Created by <strong>Girlie Razon</strong>
          </Creator>
          <Copy>
            BF <CopyrightIcon fontSize="inherit" /> 2021
          </Copy>
        </Meta>
      </Inner>
    </Footer>
  );
}

const Footer = styled.footer`
  width: 100%;
  border-top: 1px solid rgba(97, 97, 97, 0.2);
  background: var(--primary-color);
  padding: 14px 14px calc(14px + env(safe-area-inset-bottom));
`;

const Inner = styled.div`
  width: min(1100px, 92%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  /* mobile-first: stack */
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  img {
    width: 52px;
    height: 52px;
    object-fit: contain;
    border-radius: 14px;
  }
`;

const Meta = styled.div`
  display: grid;
  gap: 6px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: right;
  }
`;

const Creator = styled.div`
  color: var(--fourthly-color);
  font-weight: 800;
`;

const Copy = styled.div`
  color: var(--fourthly-color);
  font-weight: 800;
  opacity: 0.9;
`;
