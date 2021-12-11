import React from 'react'
import styled from 'styled-components'
import Footer_Logo from '../utils/images/Footer_Logo.png'
import CopyrightIcon from '@mui/icons-material/Copyright'


export default function FooterContainer() {
    return (
        <>
            <Footer>
                <InnerContainer>
                    <img src={Footer_Logo} alt='Bookface logo'/>
                </InnerContainer>

                <h4>This website is developed by:
                    <br/>
                    <u>
                        Girlie Razon
                        <br/>
                        Mohammad Haydar
                    </u>
                </h4>
                <h5>BF <CopyrightIcon fontSize='inherit'/> 2021</h5>
            </Footer>
        </>
    )
}

const Footer = styled.div`
  display: grid;
  border: 2px solid var(--fifthly-color);
  box-shadow: 0 0 100px var(--fourthly-color);
  background-color: var(--primary-color);

  h4 {
    color: var(--fourthly-color);
    text-align: center;
  }

  h5 {
    color: var(--fourthly-color);
    font-size: 1em;
    text-align: center;
  }
`

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  
  img {
    max-width: 60px;
    padding-top: 10px;
  }
`