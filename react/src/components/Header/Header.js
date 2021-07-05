import {Link} from "react-router-dom"
import './Header.css'
import '../../index.css'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import React from 'react';
import { Container } from '@material-ui/core';
import { useHistory } from "react-router";

const Header = () => {
    const history = useHistory()

    return (
        <Container fixed>
            <header>
                <ButtonGroup disableElevation variant="contained" color="primary">
                <Button onClick={() => {history.push('/users')}} size="small">Users</Button> 
                <Button onClick={() => {history.push('/groups')}} size="small">Groups</Button>
                </ButtonGroup>
            </header>
        </Container>        

    )
}

export {Header}