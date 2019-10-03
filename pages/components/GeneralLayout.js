import Footer from './Footer'

// Layout general de las pantallas
const Layout = props => (
    <div className="" style={{background: "#00aeef99"}}>
        <div className="container justify-content-center shadow-lg py-4 col-12 col-md-10 col-lg-11 col-xl-10 bg-light bg-white" style={{minHeight: 'calc(100vh - 210px)'}}>
        {props.children}
        </div>
        <Footer/>
    </div>
);

export default Layout;
