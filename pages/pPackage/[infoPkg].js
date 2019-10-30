//Packages
import React, { Component } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

//components
import Layout from '../components/GeneralLayout';
import Navigation from '../components/Navigation';
import Timeline from '../components/Timeline'
import Footer from '../components/Footer'
import Album from '../components/Album'

//Others
import data from '../data/infoPackage.json';
import imgs from '../data/packageImg.json'

// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/firestore";
import "firebase/storage";

import { initFirebase } from '../../lib/firebase'

var firebase;

class infoPkg extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            errorCode: props.errorCode,
            data: {},
            schedule: [],
            imgs: [],
            refs: []
        }

        var prom =  new Promise((resolve, reject) =>
        {
            firebase = initFirebase()
            resolve()
        })

        prom.then((success) => {
        // console.log(fire.firestore())
            var db = firebase.firestore()
            db.collection("Paquetes").where("id", "==", props.info)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.exists)
                    {
                        this.state.data = doc.data();

                        this.forceUpdate();

                        db.collection("Itinerario").where("id", "==", props.info)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (doc.exists)
                                {
                                    this.state.schedule = doc.data().schedule

                                    this.forceUpdate();
                                }
                            });
                        })

                        db.collection("ImagenesPaquetes").where("id", "==", props.info)
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                if (doc.exists)
                                {
                                    this.state.imgs = doc.data().imgs
                                    this.state.imgsRef = doc.data().refs
                                    // console.log(this.state.imgs)

                                    this.forceUpdate();
                                }
                            })
                        })
                    }
                });
            })
            .catch((err) => {
                console.log(err)
                this.state.errorCode = 204;
            });
        })

        this.fillCarousel = this.fillCarousel.bind(this)
    }

    static async getInitialProps(context)
    {
        const { infoPkg } = context.query;
        //
        // return { infoPkg };

        var errorCode = false;

        return { errorCode, info: infoPkg }
    };

    fillCarousel()
    {
        return this.state.imgs.map((item, i) => (
            <Carousel.Item key={i}>
                <img className="d-block w-100" src={item}/>
                <Carousel.Caption style={{width: "100%", left: "0px", background: "rgba(0,0,0,0.5)"}}>
                    <h3>{ item.hasOwnProperty('title') ? item.title : '' }</h3>
                    <p>{ item.hasOwnProperty('description') ? item.description : '' }</p>
                </Carousel.Caption>
            </Carousel.Item>
        ));
    }

    render() {
        if (this.state.errorCode) {
            return <Error statusCode={this.state.errorCode} />
        }
        else
        {
            var info = this.state.data

            var breakfast = info.breakfast?<img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fbreakfast.svg?alt=media&token=11a937c9-76f4-4917-b389-d071c8129957" className="col-3" title="El desayuno puede ser: Emparedado, Frutas, Torta de huevo"/>:''

            var lunch = info.lunch?<img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fburger.svg?alt=media&token=1c9f65f2-f922-4fee-986e-a1213b32c6fe" className="col-3" title="El almuerzo puede ser: Emparedado, Burrito, Perro caliente"/>:''

            var coffe = info.coffe?<img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fcoffee-cup.svg?alt=media&token=17581205-d8c9-4dea-8db6-9cee84f98c46" className="col-3" title="La merienda puede ser: Emparedado, Frutas, Galletas"/>:''

            var note = (breakfast=='' && lunch=='' && coffe=='')?'':<p className="mt-2" style={{fontSize: "14px"}}>Nota: La opciones de alimentación pueden variar</p>

        var map = info.hasOwnProperty('map') ? <div> <h3 className="row mb-3"> Mapa </h3> <img className="row col-12" src={info.map} /> </div> : ''

            return <div>
                <Navigation />
                <h1 className="pt-4 text-center mb-4">{info.name}</h1>
                <div className="container mb-3 mx-auto pt-sm-auto col-10 ">
                    <div className="row">
                        <div className="container col-md-5 col-sm-12 pr-4 mt-md-3 mt-1">
                            <h3 className="row mb-3">
                                Descripción
                            </h3>
                            <p className="mb-4">
                                { info.descrip }
                            </p>
                            <h3 className="row mb-3 mt-sm-auto mt-3 ">
                                Fotos
                            </h3>
                            <Carousel className="row mb-3 mt-sm-auto mt-3 ">
                                { this.fillCarousel() }
                            </Carousel>
                            <h3 className="row mb-3">
                                Alimentación
                            </h3>
                            <div className="" align="center">
                                {breakfast}
                                {lunch}
                                {coffe}
                                {note}
                            </div>
                            { map }
                        </div>
                        <div className="col-md-6 col-sm-11 col-11 pl-sm-4 pl-0 mt-3">
                            <h3 className="mb-3">
                                Itinerario
                            </h3>
                            <Timeline info={this.state.schedule}/>
                            <h3 className="mt-4 mb-3">
                                Capacidad
                            </h3>
                            <p>Este viaje tiene una capacidad máxima de <b>{info.capacity} personas</b></p>
                        </div>
                    </div>
                    <h4 className="mt-2 mb-4 text-center">
                    ¿Te interesa?
                    </h4>
                    <div className="row justify-content-center mb-5">
                        <div className="col">
                            <p className="text-center">
                                Contacta con nosotros para reservar este recorrido:
                            </p>
                            <div className="row justify-content-center">
                                <Link href={{ pathname: '/contact', query: { template: "bookit" }}}>
                                    <Button className="btn-lg mb-3" variant="dark" style={{background: "#f5616f", color: "black"}}>
                                        Reservar
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="col">
                            <p className="text-center">
                                O bien, contacta con nosotros para solicitar más información:
                            </p>
                            <div className="row justify-content-center">
                                <Link href={{ pathname: '/contact', query: { template: "moreInfo", pkgCode: info.id}}}>
                                    <Button className="btn-lg mb-3" style={{background: "#00aeef", color: "black"}}>
                                        Más información
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        }
    }

}

export default infoPkg;
