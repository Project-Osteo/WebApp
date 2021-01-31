import React, { useEffect, useState } from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2, FiSave } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Col, Form, Button, Modal, Row } from 'react-bootstrap';
import axios from "axios";

import './styles.css';

export default function Profile () {
    let { id } = useParams();

    return (
        <div className="profile-container">
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/editarPerfil">Editar Perfil</Nav.Link>
                        <Nav.Link>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        </div>
    );
}