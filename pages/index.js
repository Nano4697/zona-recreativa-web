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
            <CarouselCard>
                {multPrint()}
            </CarouselCard>
        </Layout>
    </div>
  );

export default Index;
