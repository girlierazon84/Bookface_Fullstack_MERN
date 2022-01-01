import React from 'react';
import { StyledBurger } from './Burger.styled'
import RightNav from './RightNav';

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}

const Burger: React.FC<Props> = ({ setOpen, open }) => {

    return (
        <>
            <StyledBurger open={ open } onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyledBurger>
            <RightNav open={open}/>
        </>
    )
}

export default Burger