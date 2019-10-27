import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import '../style/timeline-style.css'

const Footer = (props) => (
    <footer className="pt-4" style={{msFlex: "0 0 auto", flex: "0 0 auto", background: "#00803e"}}>
        <div className="container col-12">
            <div className="row ml-md-5 ml-sm-2 ml-1 pl-0">
                <div className="col-lg-1 col-md-2 col-12 p-0">
                    <div className="w-100 pt-0">
                        <Link href="/">
                            <a className="text-light" style={{fontSize: "12px"}}>
                                Inicio
                            </a>
                        </Link>
                    </div>
                    <div className="w-100 pt-0">
                        <Link href="/catalogo">
                            <a className="text-light" style={{fontSize: "12px"}}>
                                Catálogo
                            </a>
                        </Link>
                    </div>
                    <div className="w-100 pt-0">
                        <Link href="/galeria">
                            <a className="text-light" style={{fontSize: "12px"}}>
                                Galería
                            </a>
                        </Link>
                    </div>
                    <div className="w-100 pt-0">
                        <Link href="/informacion">
                            <a className="text-light" style={{fontSize: "12px"}}>
                                Información
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-1 col-md-2 col-12 p-0">
                    <div className="w-100 pt-0">
                        <Link href="/proveedores">
                            <a className="text-light" style={{fontSize: "12px"}}>
                                Proveedores
                            </a>
                        </Link>
                    </div>
                    <div className="w-100 pt-0">
                        <Link href="/contact">
                            <a className="text-light" style={{fontSize: "12px"}}>
                                Contacto
                            </a>
                        </Link>
                    </div>
                    <div className="w-100 pt-0">
                        <Link href="/about">
                            <a className="text-light" style={{fontSize: "12px"}}>
                                Acerca de
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8 col-4 float-right ml-auto mr-5 pr-5">
                    <img className="float-right" src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Flogo-2.png?alt=media&token=5af0e6da-07e4-490e-8d61-bebc7b456ce3"  style={{cursor:'pointer', height: "70px" }}/>
                </div>
            </div>
            <div className="row ml-md-5 ml-sm-2 ml-1 pt-2">
                <p  style={{fontSize: "12px"}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"             title="Flaticon">www.flaticon.com</a></p>
            </div>
        </div>

        {/*<!-- The core Firebase JS SDK is always required and must be listed first -->
            <script src="https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/6.3.4/firebase-firestore.js"></script>
            */}

        {/*<!-- TODO: Add SDKs for Firebase products that you want to use
             https://firebase.google.com/docs/web/setup#reserved-urls -->*/}

        {/*<!-- Initialize Firebase -->*/}

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> {/*Icon component*/}


        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
    </footer>
);

export default Footer
