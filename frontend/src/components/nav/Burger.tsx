// frontend/src/components/nav/Burger.tsx

import React from "react";
import { StyledBurger } from "./Burger.styled";
import RightNav from "./RightNav";


type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Burger: React.FC<Props> = ({ open, setOpen }) => {
    return (
        <>
            <StyledBurger
                open={open}
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
            >
                <div className="lines" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
            </StyledBurger>

            <RightNav open={open} />
        </>
    );
};

export default Burger;
