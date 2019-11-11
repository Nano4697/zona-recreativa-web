//Packages
import React, { Component } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error'

// Components
import Layout from '../components/GeneralLayout';
import Navigation from '../components/Navigation';
import Album from '../components/Album'

// Add the Firebase products that you want to use
import "firebase/firestore";
import "firebase/storage";

import { initFirebase } from '../../lib/firebase'

var firebase;

class album extends Component {
    constructor(props)
    {
        super(props)

        this.state = {
            errorCode: false,
            data: {}
        }

        var prom =  new Promise((resolve, reject) =>
        {
            firebase = initFirebase()
            resolve()
        })

        prom.then((success) => {
        // console.log(fire.firestore())
            var db = firebase.firestore()
            db.collection("ImagenesViaje").where("id", "==", props.info)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.length == 0)
                    this.state.errorCode = 404;

                querySnapshot.forEach((doc) => {
                    if (doc.exists)
                    {
                        this.state.data = doc.data();

                        this.forceUpdate();
                        console.log("getData", this.state.data)
                    }
                });
            })
            .catch((err) => {
                console.log(err)
                this.state.errorCode = 204;
            });
        })
    }

    static async getInitialProps(context)
    {
        const { album } = context.query;

        console.log("getinitial", context)

        return { info: album }
    };

    render() {
        if (this.state.errorCode) {
            return <Error statusCode={this.state.errorCode} />
        }
        else {
            var album = this.state.data.hasOwnProperty('imgs')?<Album images={this.state.data.imgs}/>:''
            return (
            <div>
                <Navigation />
                <Layout>
                    <h1 className="pt-4 text-center mb-4">{this.state.data.nombre}</h1>
                    <div className="container mb-5 pt-sm-auto ">
                        {album}
                    </div>
                </Layout>
            </div> )
        }
    }
}

export default album;
