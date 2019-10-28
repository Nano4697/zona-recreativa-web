//Packages --------------------------------------------------------------------------------------------------------
import React, { Component } from 'react';

// Components --------------------------------------------------------------------------------------------------------
import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Package from './components/Package';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

//Other --------------------------------------------------------------------------------------------------------

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// import data from './data/packages.json';
// import criteria from './data/filterList.json';

import { initFirebase } from '../lib/firebase'

var firebase;

class Catalogo extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            originalList: [],
            displayList: [],
            criteria: []
        };

        // console.log(props.criteria)



        var prom =  new Promise((resolve, reject) =>
        {
            firebase = initFirebase()
            resolve()
        })

        prom.then((success) => {
        // console.log(fire.firestore())
            var db = firebase.firestore()
            db.collection("Paquetes")
            .where('active', '==', true)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists)
                    {
                        this.state.originalList.push(doc.data());
                        // console.log(doc.data().type)

                        if (props.hasOwnProperty('tipo') && doc.data().type.toLowerCase() == props.tipo.toLowerCase())
                        {
                            this.state.displayList.push(doc.data());
                        }
                    }
                });

                if (this.state.displayList.length == 0)
                {
                    this.state.displayList = this.state.originalList;
                }

                //Obtiene la lista de filtros
                db.collection("filtros").get().then((querySnapshot) => {
                    var crit = []

                    querySnapshot.forEach((doc) => {
                        if (doc.exists)
                        {
                            crit.push(doc.data());
                        }
                    });



                    // turn filter on
                    if (props.hasOwnProperty('tipo'))
                    {
                        for (var i = 0; i < crit.length; i++)
                        {
                            if (crit[i].id == 'tipo')
                            {
                                for (var j = 0; j < crit[i].criteria.length; j++)
                                {
                                    crit[i].criteria[j].value = crit[i].criteria[j].name.toLowerCase() == props.tipo.toLowerCase();
                                }
                            }
                        }
                    }
                    this.state.criteria = crit;

                    this.forceUpdate()
                });
            })
        });

        // console.log(this.state.displayList)
        // console.log(data)
        this.fillCatalog = this.fillCatalog.bind(this);
        this.fillFilter = this.fillFilter.bind(this);
        this.filterPackages = this.filterPackages.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
    }

    static async getInitialProps({query})
    {
        if (query.hasOwnProperty("tipo"))
            return {tipo: query.tipo}
        else
            return {}
    }

    fillCatalog (data)
    {
        if (typeof data == "undefined")
        {
            return this.state.displayList.map(item => (
                <div key={item.id}>
                    <Package uid={item.id} title={item.name} msg={item.descrip} img={item.imgURL} />
                    <hr/>
                </div>
            ));
        }
        else
        {
            return data.map(item => (
                <div key={item.id}>
                    <Package uid={item.id} title={item.name} msg={item.descrip} img={item.imgURL} />
                    <hr/>
                </div>
            ));
        }
    }

    fillFilter ()
    {
        return this.state.criteria.map(item => (
            <div key={item.id}>
                <h6>{item.name}:</h6>
                <div className="ml-3 border-bottom">
                    {
                        item.criteria.map((crit, index) => (
                            <div key={crit.id} className="form-check">
                                <input className="form-check-input" type="checkbox" name={crit.id} id={crit.id} index={index} onChange={this.handleFilterInputChange} checked={crit.value ? 'checked' : ''}/>
                                <label className="form-check-label" htmlFor={crit.id} style={{fontSize: "14px"}}>
                                    {crit.name}
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        ));
    }

    handleFilterInputChange(e)
    {
        //obtiene el valor y el nombre del componente que cambio
        const {value, name} = e.target;

        var criteriaCopy = JSON.parse(JSON.stringify(this.state.criteria));
        var hasFilter = false;

        for (var i = 0; i < criteriaCopy.length; i++)
        {
            for (var j = 0; j < criteriaCopy[i].criteria.length; j++)
            {
                if (criteriaCopy[i].criteria[j].id == name)
                {
                    criteriaCopy[i].criteria[j].value = !criteriaCopy[i].criteria[j].value;
                    hasFilter = hasFilter || criteriaCopy[i].criteria[j].value;
                }
            }
        }

        var displayList = this.filterPackages(criteriaCopy, hasFilter)

        // Actualiza el campo que se modifico
        this.setState({
            criteria: criteriaCopy,
            displayList: displayList
        });
        // console.log(this.state.criteria)
        //
    }

    filterPackages(criteriaCopy, hasFilter)
    {
        var displayList = this.state.originalList;
        displayList = displayList.filter(function(item)
        {
            var crit = this;
            // console.log(crit)

            for (var i = 0; i < crit.length; i++)
            {
                for (var j = 0; j < crit[i].criteria.length; j++)
                {
                    if (crit[i].criteria[j].value &&
                        item[crit[i].id].toLowerCase() == crit[i].criteria[j].name.toLowerCase())
                    {
                        return true;
                    }
                }
            }
            return false;
        }, criteriaCopy);

        //si tiene al menos un elemento, imprimo eso. O si hay al menos un filtro
        if (typeof displayList !== 'undefined' && displayList.length > 0)
            return displayList
        // Si no estoy filtrando, muestro toda la lista
        else
        {
            if (hasFilter)
            {
                // console.log("deberia retornar vacio")
                return []
            }
            else
                return this.state.originalList
        }
    }

    render()
    {
        return (
            <div>
                <Navigation />
                <Layout>
                    <div className="row justify-content-center">
                        <h1 className="mt-2 mb-4">
                            Catálogo
                        </h1>
                    </div>
                    <div className="row justify-content-center mx-3">
                        <div className="col-md-3 col-12 bg-white border rounded mb-md-auto mb-2">
                            <h5 className="mt-2 border-bottom">Filtrar por:</h5>
                            {this.fillFilter()}
                        </div>
                        <div className="col-md-9 col-12 pl-md-2 px-0">
                            {this.fillCatalog()}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div>
                            <h4 className="mt-2 mb-4 text-center">
                                ¿No encuentras lo que buscas?
                            </h4>
                            <p>
                                Contacta con nosotros para explorar otras opciones:
                            </p>
                            <div className="row justify-content-center">
                                <Link href={{ pathname: '/contact', query: { template: "moreoptions" }}}>
                                    <Button className="btn-lg mb-3" style={{background: "#00aeef", color: "black"}}>
                                        Contactar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default Catalogo
