import Layout from './components/GeneralLayout';
import AdminNavigation from './components/AdminNavigation';
import Router from 'next/router'

import React, { Component } from 'react';

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
                </Layout>
            </div>
        )
    }
}

export default AdminMain;
