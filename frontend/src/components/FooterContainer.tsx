// frontend/src/components/FooterContainer.tsx

import styled from "styled-components";
import FooterLogo from "../utils/images/Footer_Logo.png";
import CopyrightIcon from "@mui/icons-material/Copyright";


export default function FooterContainer() {
  return (
    <Footer>
      <InnerContainer>
        <img src={FooterLogo} alt="Bookface logo" />
      </InnerContainer>

      <h4>
        This website is developed by:
        <br />
        <u>
          Girlie Razon
          <br />
          Mohammad Haydar
        </u>
      </h4>

      <h5>
        BF <CopyrightIcon fontSize="inherit" /> 2021
      </h5>
    </Footer>
  );
}

const Footer = styled.footer`
  display: grid;
  border-top: 2px solid var(--fifthly-color);
  box-shadow: 0 0 40px var(--fourthly-color);
  background-color: var(--primary-color);
  padding: 1rem 0;

  h4,
  h5 {
    color: var(--fourthly-color);
    text-align: center;
    margin: 0.5rem 0;
  }

  h5 {
    font-size: 1em;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 60px;
    padding-top: 10px;
  }
`;
