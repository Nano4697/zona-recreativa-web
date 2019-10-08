import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import '../style/timeline-style.css'


function sayHello(msg) {
    console.log(msg);
  }

function cutMsg(msg) {
    if (typeof msg !== 'undefined')
        return (msg.length>6)? msg.substring(0, 512)+' [...]':(msg)
    else {
        return ""
    }
}

const Package = (props) => (
    <div className="card mb-3 col-lg-12 border-0" >
        <div className="row no-gutters" >
            <div className="m-2 my-md-auto mx-auto mb-3 col-md-4 col-12">
                <Link href="/pPackage/[infoPkg]" as={`/pPackage/${props.uid}`}>
                    <img src={props !== 'undefined' && props.img !== 'undefined' && props.img} className="card-img border border-secondary" alt="..." style={ {cursor:'pointer' }} />
                </Link>
            </div>
            <div className="col-md-8 col-12">
                <div className="card-body p-md-3 p-0">
                    <h5 className="card-title">
                        {props.title}
                    </h5>
                    <p className="card-text">
                        {cutMsg(props.msg)}
                    </p>
                    <Link href="/pPackage/[infoPkg]" as={`/pPackage/${props.uid}`}>
                        <Button className="btn-sm float-right mb-3" variant="dark" style={{background: "#f36421", color: "#000"}}>
                            Ver más
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

export default Package
