import React, { Component } from 'react';

import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Package from './components/Package';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// // Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import data from './data/packages.json';
import criteria from './data/filterList.json';

const firebaseConfig = {
  apiKey: "AIzaSyCX8-lZo1LksguFjXp1aucpwn34QV33HUw",
  authDomain: "zona-recreativa-cr.firebaseapp.com",
  databaseURL: "https://zona-recreativa-cr.firebaseio.com",
  projectId: "zona-recreativa-cr",
  storageBucket: "zona-recreativa-cr.appspot.com",
  messagingSenderId: "311140447739",
  appId: "1:311140447739:web:1e629544dd2c8dff08875e"
};

class Catalogo extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
            originalList: [],
            displayList: [],
            criteria: criteria
        };

        // Initialize firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        var db = firebase.firestore();

        db.collection("Paquetes").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    this.state.originalList.push(doc.data());
                }
            });

            this.forceUpdate()
        });

        this.state.displayList = this.state.originalList;

        console.log(this.state.displayList)
        console.log(data)
        this.fillCatalog = this.fillCatalog.bind(this);
        this.fillFilter = this.fillFilter.bind(this);
        this.filterPackages = this.filterPackages.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
    }
    
    fillCatalog (data)
    {
        if (typeof data == "undefined")
        {
            return this.state.displayList.map(item => (
                <Package key={item.id} uid={item.id} title={item.nombre} msg={item.descripcion} img={item.img} />
            ));
        }
        else
        {
            return data.map(item => (
            <Package key={item.id} uid={item.id} title={item.nombre} msg={item.descripcion} img={item.img} />
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
                                <input className="form-check-input" type="checkbox" name={crit.id} id={crit.id} index={index} onChange={this.handleFilterInputChange}/>
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

        for (var i = 0; i < criteriaCopy.length; i++)
        {
            for (var j = 0; j < criteriaCopy[i].criteria.length; j++)
            {
                if (criteriaCopy[i].criteria[j].id == name)
                {
                    criteriaCopy[i].criteria[j].value = !criteriaCopy[i].criteria[j].value;
                }
            }
        }
        // console.log(criteriaCopy);
        //

        var displayList = this.filterPackages(criteriaCopy)

        // Actualiza el campo que se modifico
        this.setState({
            criteria: criteriaCopy,
            displayList: displayList
        });
        // console.log(this.state.criteria)
        //
    }

    filterPackages(criteriaCopy)
    {
        var displayList = this.state.originalList;
        displayList = displayList.filter(function(item)
        {
            var crit = this;
            console.log(crit)

            for (var i = 0; i < crit.length; i++)
            {
                for (var j = 0; j < crit[i].criteria.length; j++)
                {
                    console.log("asdlkfjasd ", crit[i].criteria[j])
                    if (crit[i].criteria[j].value &&
                        item[criteria[i].id].toLowerCase() == crit[i].criteria[j].name.toLowerCase())
                    {
                        console.log(item[criteria[i].id])
                        return true;
                    }
                }
            }
            return false;
        }, criteriaCopy);

        if (typeof displayList !== 'undefined' && displayList.length > 0)
            return displayList
        else
            return this.state.originalList
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
                </Layout>
            </div>
        )
    }
}

export default Catalogo
