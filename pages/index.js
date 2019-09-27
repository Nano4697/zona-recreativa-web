//Packages
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

//Components
import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CarouselCard from './components/CarouselCard'
import VCard from './components/VCard';

//Other
import data from './data/packages.json';

function multPrint ()
{
    var cards = ["card1", "card2", "Card 3", "Card 4", "Card 5"];
    return data.map(item => (
        <VCard key={item.id} uid={item.id} title={item.name} msg={item.description} img={item.img} />
    ));
}

const Index = props => (
    <div>
        <Navigation/>
        <Layout>
            <h4 className="ml-3">
                Más populares
            </h4>
            <p className="ml-3">
                Los viajes más solicitados por nuestros clientes:
            </p>
            <div className="px-5">
                <CarouselCard showDots={true} autoPlay={true} infinite={true}>
                    {multPrint()}
                </CarouselCard>
            </div>
            <h4 className="ml-3">
                Tipos de viajes
            </h4>
            <p className="ml-3">
                Ofrecemos distintos tipos de viajes, de acuerdo a las neccesidades de nuestros clientes:
            </p>
            <div className="px-5">
                <CarouselCard showDots={false}>
                    <div className="card mx-2" style={{height: "95%"}}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Ftarget.svg?alt=media&token=fbf3d75c-b3e7-4f43-a9c8-094d3b20c0cc" className="card-img-top pt-4 px-5" alt="Diana de tiro con arco"/>
                        <div className="card-body text-center">
                            <h5>
                                Recreativos
                            </h5>
                        </div>
                    </div>
                    <div className="card mx-2" style={{height: "95%"}}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fmasks.svg?alt=media&token=9b7ab78a-8507-452f-adb0-8c81a0c6b487" className="card-img-top pt-4 px-5" alt="Dos mascaras de teatro. Una esta triste y la otra feliz"/>
                        <div className="card-body text-center">
                            <h5>
                            Culturales
                            </h5>
                        </div>
                    </div>
                    <div className="card mx-2" style={{height: "95%"}}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fclassroom.svg?alt=media&token=eff5994f-c795-4604-aea1-46af4370f271" className="card-img-top pt-4 px-5" alt="Aula de clase. El profesor explica algo en la pizarra"/>
                        <div className="card-body text-center">
                            <h5>
                                Educativos
                            </h5>
                        </div>
                    </div>
                    <div className="card mx-2" style={{height: "95%"}}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/zona-recreativa-cr.appspot.com/o/res%2Fflasks.svg?alt=media&token=3ff3d9c4-a90a-4f89-a86e-d0c171c64410" className="card-img-top pt-4 px-5" alt="Dos frascos para experimentos quimicos"/>
                        <div className="card-body text-center">
                            <h5>
                                Científicos
                            </h5>
                        </div>
                    </div>
                </CarouselCard>
            </div>
        </Layout>
    </div>
  );

export default Index;
