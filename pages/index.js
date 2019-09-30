//Packages -----------------------------------------------------------------------------------------------------
import React, { Component } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// // Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

//Components -----------------------------------------------------------------------------------------------------
import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CarouselCard from './components/CarouselCard'
import VCard from './components/VCard';

//Other -----------------------------------------------------------------------------------------------------
// import data from './data/packages.json';

const firebaseConfig = {
  apiKey: "AIzaSyCX8-lZo1LksguFjXp1aucpwn34QV33HUw",
  authDomain: "zona-recreativa-cr.firebaseapp.com",
  databaseURL: "https://zona-recreativa-cr.firebaseio.com",
  projectId: "zona-recreativa-cr",
  storageBucket: "zona-recreativa-cr.appspot.com",
  messagingSenderId: "311140447739",
  appId: "1:311140447739:web:1e629544dd2c8dff08875e"
};


class Index extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            popular: []
        }

        // Initialize firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        var db = firebase.firestore();

        db.collection("Paquetes").orderBy("solicitudes", "desc").limit(10).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    this.state.popular.push(doc.data());
                }
            });

            this.forceUpdate()
        });

        this.multPrint = this.multPrint.bind(this);
    }

    multPrint ()
    {
        return this.state.popular.map(item => (
            <VCard key={item.id} uid={item.id} title={item.nombre} msg={item.descripcion} img={item.img} />
        ));
    }

    render()
    {
        return (
            <div>
                <Navigation/>
                <div className="position-relative">
                    <img src={require('./resources/home.jpg')} style={{width: "100%"}} alt=''/>
                    <span className="col-4 position-absolute" style={{background: "rgba(0,0,0,0.5)", height: "100%", right: "0px"}}>
                        {/*Modificar para versiones moviles*/}
                        <div className="col-9" style={{color: "#fff", top: "15%"}}>
                            <h2>Lorem Ipsum dolor sit amet, consectetur adipiscing elit</h2>
                            <p className="mt-4" style={{fontSize: "18px"}}>Quisque eu rhoncus libero. Integer nibh ante, semper non lacus id, bibendum laoreet enim.</p>
                            <Link href='/catalogo'>
                                <button className="border position-relative" style={{background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "20px", top: "120px", left: "200px"}}>
                                    Ver más →
                                </button>
                            </Link>
                        </div>
                    </span>
                </div>
                <Layout>
                    <h4 className="ml-3">
                        Más populares
                    </h4>
                    <p className="ml-3">
                        Los viajes más solicitados por nuestros clientes:
                    </p>
                    <div className="px-5">
                        <CarouselCard showDots={true} autoPlay={true} infinite={true}>
                            {this.multPrint()}
                        </CarouselCard>
                    </div>
                    <h4 className="ml-3">
                        Tipos de viajes
                    </h4>
                    <p className="ml-3">
                        Ofrecemos distintos tipos de viajes, de acuerdo a las neccesidades de nuestros clientes:
                    </p>
                    <div className="px-5">
                        <CarouselCard showDots={true}>
                            <Link href={{ pathname: '/catalogo', query: { tipo: "recreativo" }}}>
                                <div className="card mx-2" style={{height: "95%", cursor: "pointer"}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Ftarget.svg?alt=media&token=fbf3d75c-b3e7-4f43-a9c8-094d3b20c0cc" className="card-img-top pt-4 px-5" alt="Diana de tiro con arco"/>
                                    <div className="card-body text-center">
                                        <h5>
                                            Recreativos
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                            <Link href={{ pathname: '/catalogo', query: { tipo: "cultural" }}}>
                                <div className="card mx-2" style={{height: "95%", cursor: "pointer"}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fmasks.svg?alt=media&token=9b7ab78a-8507-452f-adb0-8c81a0c6b487" className="card-img-top pt-4 px-5" alt="Dos mascaras de teatro. Una esta triste y la otra feliz"/>
                                    <div className="card-body text-center">
                                        <h5>
                                        Culturales
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                            <Link href={{ pathname: '/catalogo', query: { tipo: "educativo" }}}>
                                <div className="card mx-2" style={{height: "95%", cursor: "pointer"}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fclassroom.svg?alt=media&token=eff5994f-c795-4604-aea1-46af4370f271" className="card-img-top pt-4 px-5" alt="Aula de clase. El profesor explica algo en la pizarra"/>
                                    <div className="card-body text-center">
                                        <h5>
                                            Educativos
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                            <Link href={{ pathname: '/catalogo', query: { tipo: "cientifico" }}}>
                                <div className="card mx-2" style={{height: "95%", cursor: "pointer"}}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fflasks.svg?alt=media&token=3ff3d9c4-a90a-4f89-a86e-d0c171c64410" className="card-img-top pt-4 px-5" alt="Dos frascos para experimentos quimicos"/>
                                    <div className="card-body text-center">
                                        <h5>
                                            Científicos
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        </CarouselCard>
                    </div>
                </Layout>
            </div>
        )
    }
}

export default Index;
