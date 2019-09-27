import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Package from './components/Package';


import data from './data/packages.json';

function fillComponent ()
{
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
            <div className="row justify-content-center mx-3">
                <div className="col-md-3 col-12 bg-white border rounded mb-md-auto mb-2">
                    <h6 className="mt-2 border-bottom">Filtrar por:</h6>
                    <h7 style={{fontSize: "12px"}}>Tipo de viaje:</h7>
                    <div className="ml-3">
                        <input type="checkbox" aria-label="Checkbox for following text input"/>
                    </div>
                </div>
                <div className="col-md-9 col-12 pl-md-2 px-0">
                    {fillComponent()}
                </div>
            </div>
            </Layout>
        </div>
    )
}
