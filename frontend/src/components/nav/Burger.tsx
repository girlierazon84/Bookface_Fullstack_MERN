// frontend/src/components/nav/Burger.tsx

import React from "react";
import { StyledBurger } from "./Burger.styled";
import RightNav from "./RightNav";


// Props definition for Burger component
type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Burger menu component that toggles the right navigation drawer
const Burger: React.FC<Props> = ({ open, setOpen }) => {
    // Function to toggle the open state of the navigation menu
    const toggle = () => setOpen((prev) => !prev);

    return (
        <>
            <StyledBurger
                open={open}
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
