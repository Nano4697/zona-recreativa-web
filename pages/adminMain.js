import React, { Component } from 'react';
import Layout from './components/GeneralLayout';
import Link from 'next/link';
import AdminNavigation from './components/AdminNavigation';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import IconButton from '@material-ui/core/IconButton';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import CommuteIcon from '@material-ui/icons/Commute';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

class AdminMain extends Component {
    render()
    {
        return (
            <div>
                <AdminNavigation />
                <Layout>
                    <div className="row justify-content-center">
                        <h1 className="mt-2 mb-4">
                            Administrador
                        </h1>
                    </div>
                    <div className="row col-9 mx-auto mt-5 justify-content-center">
                        <div className="justify-content-center mx-3">
                            <div className="row justify-content-center">
                                <IconButton>
                                    <Link href="/adminPackages">
                                        <EventAvailableIcon style={{fontSize: '7rem', color: '#007f3d'}}/>
                                    </Link>
                                </IconButton>
                            </div>
                            <h5 className="text-center">Gestionar paquetes</h5>
                        </div>
                        <div className="justify-content-center mx-3">
                            <div className="row justify-content-center">
                                <IconButton>
                                    <Link href="/adminSeguros">
                                        <VerifiedUserIcon style={{fontSize: '7rem', color: '#007f3d'}}/>
                                    </Link>
                                </IconButton>
                            </div>
                            <h5 className="text-center">Gestionar seguros<br/>laborales</h5>
                        </div>
                        <div className="justify-content-center mx-3">
                            <div className="row justify-content-center">
                                <IconButton>
                                    <Link href="/adminPlanesA">
                                        <FastfoodIcon style={{fontSize: '7rem', color: '#007f3d'}}/>
                                    </Link>
                                </IconButton>
                            </div>
                            <h5 className="text-center">Gestionar planes<br/>alimenticios</h5>
                        </div>
                        <div className="justify-content-center mx-3">
                            <div className="row justify-content-center">
                                <IconButton>
                                    <Link href="/adminPersonalM">
                                        <LocalHospitalIcon style={{fontSize: '7rem', color: '#007f3d'}}/>
                                    </Link>
                                </IconButton>
                            </div>
                            <h5 className="text-center">Gestionar personal<br/>medico</h5>
                        </div>
                        <div className="justify-content-center mx-3">
                            <div className="row justify-content-center">
                                <IconButton>
                                    <Link href="/adminTran">
                                        <CommuteIcon style={{fontSize: '7rem', color: '#007f3d'}}/>
                                    </Link>
                                </IconButton>
                            </div>
                            <h5 className="text-center">Gestionar servicios<br/>de transporte</h5>
                        </div>
                        <div className="justify-content-center mx-3">
                            <div className="row justify-content-center">
                                <IconButton>
                                    <Link href="/addTravelPhotos">
                                        <PhotoLibraryIcon style={{fontSize: '7rem', color: '#007f3d'}}/>
                                    </Link>
                                </IconButton>
                            </div>
                            <h5 className="text-center">Agregar fotos<br/>de un viaje</h5>
                        </div>
                        <div className="justify-content-center mx-3">
                            <div className="row justify-content-center">
                                <IconButton>
                                    <Link href="/addAdmin">
                                        <SupervisorAccountIcon style={{fontSize: '7rem', color: '#007f3d'}}/>
                                    </Link>
                                </IconButton>
                            </div>
                            <h5 className="text-center">Gestionar empleados</h5>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default AdminMain;
