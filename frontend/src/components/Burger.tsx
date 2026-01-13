// frontend/src/components/Burger.tsx

import React from "react";
import { StyledBurger } from "../types/Burger.styled";
import RightNav from "./RightNav";


type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Burger: React.FC<Props> = ({ open, setOpen }) => {
    const toggle = () => setOpen((prev) => !prev);

    return (
        <>
            <StyledBurger
                $open={open}
                type="button"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={open}
                aria-controls="primary-navigation"
                onClick={toggle}
            >
                <div className="lines" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
            </StyledBurger>

            <RightNav open={open} setOpen={setOpen} />
        </>
    );
};

export default Burger;
