import Footer from './Footer'

// Layout general de las pantallas
const Layout = props => (
    <div className="">
        <div className="container justify-content-center py-4 col-11" style={{minHeight: 'calc(100vh - 210px)'}}>
        {props.children}
        </div>
        <Footer/>
    </div>
);

export default Layout;
