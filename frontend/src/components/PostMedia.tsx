// frontend/src/components/PostMedia.tsx

import React from "react";
import styled from "styled-components";
import type { PostMediaDTO } from "../service/postService";


/**----------------------
    Styled-components
-------------------------*/
const MediaWrap = styled.div`
    margin-top: 10px;
    display: grid;
    gap: 10px;
`;

const Img = styled.img`
    width: 100%;
    display: block;
    border-radius: 14px;
    border: 1px solid rgba(97, 97, 97, 0.15);
`;

const Vid = styled.video`
    width: 100%;
    display: block;
    border-radius: 14px;
    border: 1px solid rgba(97, 97, 97, 0.15);
`;

type Props = {
    media?: PostMediaDTO[];
    legacyImageUrl?: string;
};

const PostMedia: React.FC<Props> = ({ media, legacyImageUrl }) => {
    const list = media ?? [];

    if (!list.length && !legacyImageUrl) return null;

    return (
        <MediaWrap>
            {list.length
                ? list.map((m) =>
                    m.type === "video" ? (
                        <Vid key={m.publicId} controls preload="metadata">
                            <source src={m.url} />
                        </Vid>
                    ) : (
                        <Img key={m.publicId} src={m.url} alt="Post media" loading="lazy" />
                    )
                )
                : legacyImageUrl
                    ? <Img src={legacyImageUrl} alt="Post media" loading="lazy" />
                    : null}
        </MediaWrap>
    );
};

export default PostMedia;
