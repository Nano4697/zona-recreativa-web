import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import { InputField } from './components/Fields/InputField';
import { SelectField } from './components/Fields/SelectField';
import { Formik, Field } from 'formik';

export default function adminTrans ()
{       return(
        <div>
            <Navigation />
            <Layout>
                <div className="row justify-content-center">
                    <h1 className="mt-2 mb-4">
                        Administración de transporte
                    </h1>
                </div>
            </Layout>
            <div className="package-admin-table" style={{textAlign: 'center'}}>
            <table class="center" style={{width:"25%" ,textAlign:"center", fontSize:'17px', marginBottom:"50px", marginLeft: "auto", marginRight: "auto"}}>
                <tr>
                    <th>Lugar Inicio</th>
                    <th>Lugar Final</th>
                    <th>Hora Inicio</th>
                    <th>Hora Final</th>
                </tr>
                <tr>
                    <td>Lugar 1</td>
                    <td>Lugar 2</td>
                    <td>7:30</td>
                    <td>10:20</td>
                </tr>
                <tr>
                    <td>Lugar 3</td>
                    <td>Lugar 4</td>
                    <td>11:30</td>
                    <td>13:00</td>
                </tr>
            </table>
            </div>
            <div className="package-admin-group" style={{textAlign: 'center'}}>
                <Formik  onSubmit={(data)=>{console.log(data)}}
                    initialValues = {{
                        lugarInicio: "",
                        lugarFinal: "",
                        horaInicio: "",
                        horaFinal: "",
                        accionTrans: "Crear"
                    }}>
                        {({values, handleSubmit}) =>  
                        <form onSubmit={handleSubmit}>
                            <Field name="lugarInicio" placeholder="Lugar de inicio" component={InputField}/>
                            <Field name="lugarFinal" placeholder="Lugar Final" component={InputField}/>
                            <Field name="horaInicio" placeholder="Hora de Inicio" component={InputField}/>
                            <Field name="horaFinal" placeholder="Hora Final" component={InputField}/>
                            <div>
                                <Field component={SelectField} name="accionTrans" >
                                    <option name="crearTrans">Crear</option>
                                    <option name="eliiminarTrans">Eliminar</option>
                                    <option name="actualizarTrans">Actualizar</option>
                                </Field>
                            </div>
                            <div className="form-buttns" style={{textAlign: 'center'}}>
                                <button type="submit">Enviar</button>
                            </div>
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