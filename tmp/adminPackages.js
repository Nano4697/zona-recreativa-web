import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import { InputField } from './components/Fields/InputField';
import { SelectField } from './components/Fields/SelectField';
import { Formik, Field } from 'formik';

export default function adminPackages ()
{       return(
        <div>
            <Navigation />
            <Layout>
                <div className="row justify-content-center">
                    <h1 className="mt-2 mb-4">
                        Administración paquetes
                    </h1>
                </div>
            </Layout>
            <br></br>
            <div className="package-admin-table">
            <table style={{width:"99%", textAlign:"center", fontSize:'17px', marginBottom:"50px"}}>
                <tr>
                    <th>Nombre Paquete</th>
                    <th>Precio</th>
                    <th>Hora inicio</th>
                    <th>Hora final</th>
                    <th>Capacidad</th>
                    <th>Tipo de ruta</th>
                    <th>Tipo de geografía</th>
                </tr>
                <tr>
                    <td>Paquete 1</td>
                    <td>1000¢</td>
                    <td>7:30</td>
                    <td>13:00</td>
                    <td>250</td>
                    <td>Educativa</td>
                    <td>A</td>
                </tr>
                <tr>
                    <td>Paquete 2</td>
                    <td>1000¢</td>
                    <td>8:00</td>
                    <td>12:30</td>
                    <td>300</td>
                    <td>Educativa</td>
                    <td>P</td>
                </tr>
            </table>
            </div>
            <div className="package-admin-group" style={{textAlign: 'center'}}>
                <Formik  onSubmit={(data)=>{console.log(data)}}
                    initialValues = {{
                        nombrePaquete: "",
                        precioPaquete: "",
                        horaInicio: "",
                        horaFinal: "",
                        capacidadPaquete: "",
                        tipoRuta: "",
                        tipoGeografia: "",
                        accionPaquete: "Crear"
                    }}>
                        {({handleSubmit}) =>  
                        <form onSubmit={handleSubmit}>
                            <Field name="nombrePaquete" placeholder="Nombre del paquete" component={InputField}/>
                            <Field name="precioPaquete" placeholder="Precio del paquete" component={InputField}/>
                            <Field name="horaInicio" placeholder="Hora de Inicio" component={InputField}/>
                            <Field name="horaFinal" placeholder="Hora Final" component={InputField}/>
                            <Field name="capacidadPaquete" placeholder="Capacidad de paquete" component={InputField}/>
                            <Field name="tipoRuta" placeholder="Tipo de ruta" component={InputField}/>
                            <Field name="tipoGeografia" placeholder="Tipo de geografía" component={InputField}/>
                            <div>
                                <Field component={SelectField} name="accionPaquete" >
                                    <option name="crearPaquete">Crear</option>
                                    <option name="eliiminarPaquete">Eliminar</option>
                                    <option name="actualizarPaquete">Actualizar</option>
                                </Field>
                            </div>
                            <div className="form-buttns" style={{textAlign: 'center'}}>
                                <button type="submit">Enviar</button>
                            </div>
                            <br></br>
                        </form>  }
    
                </Formik>

                <style jsx>{`

                .package-admin-group button {
                    position: relative;
                    border:0.1em solid #42c8f5;
                    font-size: 15px;
                    background-color: black;
                    color: white;
                    padding: 1em 2em;
                    box-sizing: border-box;
                    text-decoration:none;
                    margin-top: 25px;
                    text-align: center;
                    transition: all 0.2s;
                }

                .package-admin-group button:hover {
                    color: #000000;
                    background-color: #42c8f5;
                }
                `}</style>
            </div>
        </div>
    )
}