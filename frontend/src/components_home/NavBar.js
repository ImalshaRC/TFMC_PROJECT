import React, { Component } from 'react';
import { Navbar ,Container ,Nav  } from 'react-bootstrap';
import logo from './images/logo.png';
import './css/navbar.css';


class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                <Container>
                
                <Navbar.Brand ><img src={logo} class="navlogo" alt="FineLeaves"/></Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/Home">Home</Nav.Link>
                <Nav.Link href="#thestory">Story</Nav.Link>
                <Nav.Link href="#products">Products</Nav.Link>
                <Nav.Link href="#aboutus">AboutUs</Nav.Link>
                <Nav.Link href="#contactus">ContactUs</Nav.Link>
                </Nav>
                </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;