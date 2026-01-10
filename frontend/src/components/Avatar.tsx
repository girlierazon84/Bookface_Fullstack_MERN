// frontend/src/components/ui/Avatar.tsx

import React, { useMemo, useState } from "react";
import styled from "styled-components";


/**---------------------------------
    Styled Components for Avatar
------------------------------------*/
const Wrap = styled.div<{ $size: number }>`
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border-radius: 50%;
    overflow: hidden;
    display: grid;
    place-items: center;

    border: 1px solid var(--thirdly-color);
    background: #fff;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

const Initials = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    font-weight: 900;
    color: var(--secondary-color);
    background: white;
`;

// Avatar component props definition
type Props = {
    src?: string | null;
    alt?: string;
    name?: string; // used for initials fallback
    size?: number; // px
    className?: string;
};

// Default avatar image path definition
const DEFAULT_AVATAR = "/images/default-avatar.png"; // put file in /public/images/

// Function to extract initials from a name string or return a default emoji if name is empty or undefined
const getInitials = (name?: string) => {
    // Trim and check if name is empty or undefined
    const n = (name ?? "").trim();
    if (!n) return "🙂";
    const parts = n.split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("");
};

// Function to check if a given string is probably a URL
const isProbablyUrl = (value?: string | null) => {
    // Basic check for URL patterns
    if (!value) return false;
    return value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/");
};

// Avatar component definition
const Avatar: React.FC<Props> = ({ src, alt = "Avatar", name, size = 42, className }) => {
    // State to track if image loading has failed
    const [failed, setFailed] = useState(false);

    // Memoized computation of the safe image source to use
    const safeSrc = useMemo(() => {
        // If loading the provided src failed, fallback to default avatar image
        if (failed) return DEFAULT_AVATAR;
        if (!isProbablyUrl(src)) return DEFAULT_AVATAR;
        return src!;
    }, [src, failed]);

    // Memoized computation of initials from the name prop for fallback display
    const initials = useMemo(() => getInitials(name), [name]);

    return (
        <Wrap $size={size} className={className} aria-label={alt} title={name ?? alt}>
            {/* If even default image fails, we show initials */}
            {!safeSrc ? (
                <Initials>{initials}</Initials>
            ) : (
                <Img
                    src={safeSrc}
                    alt={alt}
                    onError={() => {
                        // if the given src fails -> fallback to default
                        // if default fails too -> drop to initials
                        if (safeSrc === DEFAULT_AVATAR) setFailed(true);
                        else setFailed(true);
                    }}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                />
            )}
            {failed && <Initials aria-hidden="true">{initials}</Initials>}
        </Wrap>
    );
};

export default Avatar;
