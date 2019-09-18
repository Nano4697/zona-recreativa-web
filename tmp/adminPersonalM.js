import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import { InputField } from './components/Fields/InputField';
import { SelectField } from './components/Fields/SelectField';
import { Formik, Field } from 'formik';

export default function adminPersonalM ()
{       return(
        <div>
            <Navigation />
            <Layout>
                <div className="row justify-content-center">
                    <h1 className="mt-2 mb-4">
                        Administración de personal médico
                    </h1>
                </div>
            </Layout>
            <br></br>
            <div className="package-admin-table" style={{textAlign: 'center'}}>
            <table class="center" style={{width:"25%" ,textAlign:"center", fontSize:'17px', marginBottom:"50px", marginLeft: "auto", marginRight: "auto"}}>
                <tr>
                    <th>Nombre de la persona</th>
                    <th>Nombre del paquete</th>
                </tr>
                <tr>
                    <td>Persona 1</td>
                    <td>Paquete 1</td>
                </tr>
                <tr>
                    <td>Persona 2</td>
                    <td>Paquete 1</td>
                </tr>
            </table>
            </div>
            <div className="personal-admin-group" style={{textAlign: 'center'}}>
                <Formik  onSubmit={(data)=>{console.log(data)}}
                    initialValues = {{
                        nombrePersona: "",
                        nombrePaquete: "",
                        accionPersonal: "Crear"
                    }}>
                        {({values, handleSubmit}) =>  
                        <form onSubmit={handleSubmit}>
                            <Field name="nombrePersona" placeholder="Nombre de la persona" component={InputField}/>
                            <Field name="nombrePaquete" placeholder="Nombre del paquete" component={InputField}/>
                            <div>
                                <Field component={SelectField} name="accionPersonal" >
                                    <option name="crearPersonal">Crear</option>
                                    <option name="eliiminarPersonal">Eliminar</option>
                                    <option name="actualizarPersonal">Actualizar</option>
                                </Field>
                            </div>
                            <div className="form-buttns" style={{textAlign: 'center'}}>
                                <button type="submit">Enviar</button>
                            </div>
                        </form>  }
    
                </Formik>

                <style jsx>{`

                .personal-admin-group button {
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

                .personal-admin-group button:hover {
                    color: #000000;
                    background-color: #42c8f5;
                }
                `}</style>
            </div>
        </div>
    )
}