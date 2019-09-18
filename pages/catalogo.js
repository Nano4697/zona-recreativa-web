import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Package from './components/Package';


import data from './data/packages.json';

function multPrint ()
{
    var cards = ["card1", "card2", "Card 3", "Card 4", "Card 5"];
    return data.map(item => (
        <Package key={item.id} uid={item.id} title={item.name} msg={item.description} img={item.img} />
    ));
}

export default function catalogo ()
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
                {multPrint()}
            </Layout>
            <Footer />
        </div>
    )
}
