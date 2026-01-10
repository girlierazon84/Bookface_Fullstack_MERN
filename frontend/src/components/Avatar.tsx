// frontend/src/components/Avatar.tsx

import React, { useMemo, useState } from "react";
import styled from "styled-components";


/**---------------------------------
    Styled Components for Avatar
------------------------------------*/
const Wrap = styled.div<{ $size: number }>`
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 999px;
    overflow: hidden;

    display: grid;
    place-items: center;

    /* ✅ Critical fix for absolute children */
    position: relative;

    border: 1px solid rgba(97, 97, 97, 0.22);
    background: ${({ theme }) => theme.colors.fourthly};
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
`;

const Initials = styled.div`
    position: absolute;
    inset: 0;

    display: grid;
    place-items: center;

    font-weight: 900;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.fourthly};
`;

/**-----------------------
    Helpers
------------------------*/
const DEFAULT_AVATAR = "/images/default-avatar.png"; // /public/images/default-avatar.png

const getInitials = (name?: string) => {
    const n = (name ?? "").trim();
    if (!n) return "🙂";
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("");
};

const isProbablyUrl = (value?: string | null) => {
    if (!value) return false;
    return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
};

/**-----------------------
    Types
------------------------*/
type Props = {
    src?: string | null;
    alt?: string;
    name?: string;
    size?: number;
    className?: string;
};

type Mode = "img" | "fallback" | "initials";

/**-----------------------
    Avatar
------------------------*/
const Avatar: React.FC<Props> = ({ src, alt = "Avatar", name, size = 42, className }) => {
    const initials = useMemo(() => getInitials(name), [name]);

    // start with provided src if valid; otherwise default
    const initialSrc = useMemo(() => (isProbablyUrl(src) ? src! : DEFAULT_AVATAR), [src]);

    const [mode, setMode] = useState<Mode>("img");
    const [resolvedSrc, setResolvedSrc] = useState<string>(initialSrc);

    const handleError = () => {
        // first failure -> try default avatar
        if (mode === "img" && resolvedSrc !== DEFAULT_AVATAR) {
            setMode("fallback");
            setResolvedSrc(DEFAULT_AVATAR);
            return;
        }

        // default avatar also failed -> show initials
        setMode("initials");
    };

    return (
        <Wrap $size={size} className={className} aria-label={alt} title={name ?? alt}>
            {mode === "initials" ? (
                <Initials aria-hidden="true">{initials}</Initials>
            ) : (
                <Img
                    src={resolvedSrc}
                    alt={alt}
                    onError={handleError}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                />
            )}
        </Wrap>
    );
};

export default Avatar;
