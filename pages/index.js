import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const Index = props => (
    <div>
        <Navigation/>
        <Layout>
            <img src={require('./resources/logo.png')} className="col-4 mx-auto d-block" alt="..." />
        </Layout>
        <Footer/>
    </div>
  );

export default Index;
