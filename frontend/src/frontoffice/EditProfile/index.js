import React, { useEffect, useState } from 'react';
import { Link, useParams,useHistory } from 'react-router-dom';
import { FiHome, FiSettings, FiPower, FiArrowLeft, FiEdit2, FiTrash2, FiSave } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Col, Form, Button, Modal, Row } from 'react-bootstrap';
import axios from "axios";

import './styles.css';

export default function EditProfile () {
    return(
        <h1>Editar Perfil</h1>
    );
}