import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

function cutMsg(msg) {
    if (typeof msg !== 'undefined')
        return (msg.length>50)? msg.substring(0, 50)+' [...] ':(msg)
    else {
        return ""
    }
}

const VCard = (props) => (
    <div className="card mb-3 col-lg-11 col-12 mx-auto" style={{height: "88%"}} >
        <div className="row" style={{height: "50%"}}>
            <div className="m-2 " style={{height: "100%"}}>
                <Link href="/pPackage/[infoPkg]" as={`/pPackage/${props.uid}`}>
                    <img src={props !== 'undefined' && props.img !== 'undefined' && require(`../resources/${props.img}`)}
                    className="card-img border my-auto border-secondary" alt="..." style={ {cursor:'pointer', height: "90%" }} />
                </Link>
            </div>
        </div>
        <div className="row" style={{height: "50%"}}>
            <div className="card-body p-2" style={{height: "100%"}}>
                <div className="row justify-content-center" style={{height: "100%"}}>
                    <p className="card-title">
                        <span className="d-inline-block text-truncate" style={{maxWidth: "150px"}}>
                            {props.title}
                        </span>
                    </p>
                    <p className="card-body pt-0 ">
                        {cutMsg(props.msg)}

                        <Link href="/pPackage/[infoPkg]" as={`/pPackage/${props.uid}`}>
                            <a>
                                Ver más
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
)

export default VCard
