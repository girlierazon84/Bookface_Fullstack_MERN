// frontend/src/components/nav/Burger.tsx

import React from "react";
import { StyledBurger } from "./Burger.styled";
import RightNav from "./RightNav";


// Props for the Burger component
type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Burger component definition with accessibility features and state management for the navigation menu
const Burger: React.FC<Props> = ({ open, setOpen }) => {
    // Toggle function to open/close the navigation menu
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
