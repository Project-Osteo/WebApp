import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card'
import { Nav, Col, Form, Button, Modal, Row, CardGroup } from 'react-bootstrap';
import axios from "axios";
 
import './styles.css';

export default function Estatisticas () {
    return(

      <div className="estatisticas-container">

        <header>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand><b>OSTEOCLINIC</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/homepage">Homepage</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>

        <div className="container">

        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title>Pacientes</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Consultas</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to additional
                content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Treinos</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Feedbacks</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This card has even longer content than the first to
                show that equal height action.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>

        </div>

      </div>
    );
}