// frontend/src/view/SignUpFormView.tsx

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import RegistrationForm from "../components/RegistrationForm";
import RoutingPath from "../routes/routingPath";
import logo from "../assets/logo.png";


/**-----------------------
    Styled Components
--------------------------*/
const Page = styled.main`
    background: ${({ theme }) => theme.colors.primary};
    min-height: calc(100vh - 85px);
    display: grid;
    place-items: center;
    padding: 30px 0;
`;

const Shell = styled.section`
    width: min(1100px, 92%);
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 40px;
    align-items: center;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        gap: 18px;
    }
`;

const Left = styled.div`
    padding: 12px;
`;

const BrandRow = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 12px;
`;

const BrandLogo = styled.img`
    width: 56px;
    height: 56px;
    object-fit: contain;
    border-radius: 14px;
`;

const Wordmark = styled.img`
    height: 44px;
    width: auto;
    display: block;

    @media (max-width: 520px) {
        height: 38px;
    }
`;

const Pitch = styled.p`
    margin: 10px 0 0;
    color: ${({ theme }) => theme.colors.text_secondary};
    font-size: 1.35rem;
    line-height: 1.3;
`;

const Right = styled.div`
    display: grid;
`;

const Card = styled.div`
    background: ${({ theme }) => theme.colors.fourthly};
    border: 1px solid rgba(97, 97, 97, 0.25);
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.colors.card_shadow};
    padding: 18px;
`;

const Title = styled.h1`
    margin: 0;
    color: ${({ theme }) => theme.colors.text_primary};
    font-weight: 900;
    font-size: 1.6rem;
`;

const SubTitle = styled.p`
    margin: 6px 0 0;
    color: ${({ theme }) => theme.colors.text_secondary};
    font-weight: 700;
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid rgba(97, 97, 97, 0.2);
    margin: 12px 0;
`;

const FooterText = styled.p`
    margin: 14px 0 0;
    text-align: center;
    color: ${({ theme }) => theme.colors.text_secondary};
    font-weight: 700;
`;

const LinkStyled = styled(Link)`
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    font-weight: 900;

    &:hover {
        text-decoration: underline;
    }
`;

/**--------------------------
    Helpers (for FontImg)
-----------------------------*/
const toHexNoHash = (color: unknown, fallback: string) => {
    if (typeof color !== "string") return fallback;
    const raw = color.trim();
    const hex = raw.startsWith("#") ? raw.slice(1) : raw;
    if (/^[0-9a-fA-F]{6}$/.test(hex)) return hex.toUpperCase();
    return fallback;
};

const setQueryParam = (url: string, key: string, value: string) => {
    try {
        const u = new URL(url);
        u.searchParams.set(key, value);
        return u.toString();
    } catch {
        return url;
    }
};

const SignUpFormView: React.FC = () => {
    const theme = useTheme() as any;

    const baseWordmark =
        "https://see.fontimg.com/api/rf5/K74zp/ZjA0ZDIwYjE0YzZmNDIzYjkzNzA1ZTg1OTgwZGM3MTQudHRm/Qm9va0ZhY2U/motterdam.png?r=fs&h=98&w=1500&fg=000000&bg=FFFFFF&tb=1&s=65";

    const fg = toHexNoHash(theme?.colors?.secondary, "0000FF"); // ✅ blue / secondary
    const bg = toHexNoHash(theme?.colors?.primary, "FFFFFF");

    const wordmarkSrc = useMemo(() => {
        let u = baseWordmark;
        u = setQueryParam(u, "fg", fg);
        u = setQueryParam(u, "bg", bg);
        return u;
    }, [fg, bg]);

    return (
        <Page>
            <Shell>
                <Left>
                    <BrandRow>
                        <BrandLogo src={logo} alt="Bookface logo" />
                        <Wordmark src={wordmarkSrc} alt="Bookface wordmark" />
                    </BrandRow>

                    <Pitch>Create an account to share posts, connect, and customize your profile.</Pitch>
                </Left>

                <Right>
                    <Card>
                        <Title>Create a new account</Title>
                        <SubTitle>It’s quick and easy.</SubTitle>
                        <Divider />
                        <RegistrationForm />
                        <FooterText>
                            Already have an account? <LinkStyled to={RoutingPath.usersLogInView}>Log in</LinkStyled>
                        </FooterText>
                    </Card>
                </Right>
            </Shell>
        </Page>
    );
};

export default SignUpFormView;
