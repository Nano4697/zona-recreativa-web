//Packages
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

function fillCarousel()
{
    return imgs.map(item => (
        <Carousel.Item key={item.id}>
            <img className="d-block w-100" src={require(`../resources/${item.img}`)}/>
            <Carousel.Caption style={{width: "100%", left: "0px", background: "rgba(0,0,0,0.5)"}}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
            </Carousel.Caption>
        </Carousel.Item>
    ));
}


const Post = props => {
    if (props.errorCode) {
      return <Error statusCode={props.errorCode} />
    }
    else
        return <div>
        <Navigation />
            <h1 className="pt-4 text-center mb-4">{props.info.name}</h1>
            <div className="container mb-3 mx-auto pt-sm-auto col-10 ">
                <div className="row">
                    <div className="container col-md-7 col-sm-12 pr-4 mt-md-3 mt-1">
                        <h3 className="row mb-3">
                            Descripción
                        </h3>
                        <p className="mb-4">
                            { props.info.description }
                        </p>
                        <h3 className="row mb-3 mt-sm-auto mt-3 ">
                            Fotos
                        </h3>
                        <Carousel className="row mb-3 mt-sm-auto mt-3 ">
                            {fillCarousel()}
                        </Carousel>
                        <h3 className="row mb-3">
                            Alimentación
                        </h3>
                        <div className="" align="center">
                            <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fbreakfast.svg?alt=media&token=11a937c9-76f4-4917-b389-d071c8129957" className="col-2" title="El desayuno puede ser: Emparedado, Frutas, Torta de huevo"/>
                            <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fburger.svg?alt=media&token=1c9f65f2-f922-4fee-986e-a1213b32c6fe" className="col-2" title="El aalmuerzo puede ser: Emparedado, Burrito, Perro caliente"/>
                            <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fcoffee-cup.svg?alt=media&token=17581205-d8c9-4dea-8db6-9cee84f98c46" className="col-2" title="La merienda puede ser: Emparedado, Frutas, Galletas"/>
                            <p className="mt-2" style={{fontSize: "14px"}}>Nota: La opciones de alimentación pueden variar</p>
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-11 col-11 pl-sm-4 pl-0 mt-3">
                        <h3 className="mb-3">
                            Itinerario
                        </h3>
                        <Timeline info={props.info.schedule}/>
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
                                <Link href={{ pathname: '/contact', query: { template: "moreInfo", pkgCode: props.info.id}}}>
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
};

Post.getInitialProps = async function(context) {
    const { infoPkg } = context.query;
  //
  // return { infoPkg };

    var errorCode = false;
    console.log(infoPkg)

    for (var i = 0; i < data.length; i++) {
        if (typeof data[i].id !== 'undefined' && data[i].id == infoPkg)
        {
            var result = data[i];
            // console.log(result)
            return { errorCode, info: result };
        }
    }

    errorCode = 204;
    return { errorCode, info: {} }
};

export default Post;
