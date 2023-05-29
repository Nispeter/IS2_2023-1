import { React } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Sidebar.css";
import Cookies from 'js-cookie'
import logo from '../../images/Debugger.png'

export const SideBarAdmin = () => {
    const handleLogout = () => {
        Cookies.remove('authenticated');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('type_of_user');
    };
    return (
        <div className="sidebar">

            <Link to="/adminviewmain">
                <div className="logo-container-admin">
                    <img src={logo} alt="Logo" height="120" width="120" className="logo-img" />
                </div>
            </Link>

            <Link to="/adminviewmain">
                <div className="icon-container assign-bug">
                    <i className="bi bi-file-person-fill"></i>
                    <h1>Asignar Bug</h1>
                    <span className="oval"></span>
                </div>
            </Link>

            <Link >
                <div className="icon-container">
                    <i className="bi bi-clipboard-data-fill"></i>
                    <h1>Estadísticas</h1>
                    <span className="oval"></span>
                </div>
            </Link>
            <Link to="/my_reports">
                <div className="icon-container">
                    <i className="bi bi-clipboard2-check-fill"></i>
                    <h1>Mis Reportes</h1>
                    <span className="oval"></span>
                </div>
            </Link>

            <Link to="/login">
                <div className="icon-container log-outadmin" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left"></i>
                    <h1>Cerrar Sesión</h1>
                    <span className="oval"></span>
                </div>
            </Link>

        </div>
    );

};

export default SideBarAdmin;
