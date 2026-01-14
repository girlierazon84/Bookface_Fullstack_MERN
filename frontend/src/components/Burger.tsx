// frontend/src/components/Burger.tsx

import React from "react";
import { StyledBurger } from "../types/Burger.styled";
import RightNav from "./RightNav";


type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Burger: React.FC<Props> = ({ open, setOpen }) => {
    const btnRef = React.useRef<HTMLButtonElement | null>(null);

    const toggle = () => setOpen((prev) => !prev);

    return (
        <>
            <StyledBurger
                ref={btnRef}
                $open={open}
                type="button"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={open}
                aria-controls="primary-navigation"
                aria-haspopup="dialog"
                onClick={toggle}
            >
                <div className="lines" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
            </StyledBurger>

            {/* ✅ pass anchorRef so RightNav can attach to burger */}
            <RightNav open={open} setOpen={setOpen} anchorRef={btnRef} />
        </>
    );
};

export default Burger;
