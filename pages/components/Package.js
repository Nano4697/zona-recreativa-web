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
    <div className="card mb-3 col-lg-10 col-12 mx-auto" >
        <div className="row no-gutters" >
            <div className="m-2 my-md-auto mx-auto mb-3 col-md-3 col-7">
                <Link href="/pPackage/[infoPkg]" as={`/pPackage/${props.uid}`}>
                    <img src={require('../resources/' + props.img)} className="card-img p-2 border border-secondary" alt="..." style={ {cursor:'pointer' }} />
                </Link>
            </div>
            <div className="col-md-8 col-10">
                <div className="card-body p-3">
                    <h5 className="card-title">
                        {props.title}
                    </h5>
                    <p className="card-text">
                        {cutMsg(props.msg)}
                    </p>
                    <Link href="/pPackage/[infoPkg]" as={`/pPackage/${props.uid}`}>
                        <Button onClick={() => sayHello(props.title)} className="btn-sm float-right mb-3" variant="dark">
                            Ver más
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

export default Package
