import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import '../style/timeline-style.css'

const Footer = (props) => (
    <footer className="bg-dark py-4" style={{msFlex: "0 0 auto", flex: "0 0 auto"}}>
        <div className="row col-md-2 col-sm-4 col-2 col-xs-6 ml-md-5 ml-sm-2 ml-1">
            <div className="col-6">
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
            <div className="col-6">
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
        </div>

        {/*<!-- The core Firebase JS SDK is always required and must be listed first -->*/}
        <script src="https://www.gstatic.com/firebasejs/6.6.2/firebase-app.js"></script>

        {/*<!-- TODO: Add SDKs for Firebase products that you want to use
             https://firebase.google.com/docs/web/setup#reserved-urls -->*/}

        {/*<!-- Initialize Firebase -->*/}


    </footer>
);

export default Footer
