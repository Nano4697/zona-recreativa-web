import Layout from './components/GeneralLayout';
import Navigation from './components/Navigation';
import { InputField } from './components/Fields/InputField';
import { SelectField } from './components/Fields/SelectField';
import { Formik, Field } from 'formik';

export default function adminPlanesA ()
{       return(
        <div>
            <Navigation />
            <Layout>
                <div className="row justify-content-center">
                    <h1 className="mt-2 mb-4">
                        Administración de planes alimenticios
                    </h1>
                </div>
            </Layout>
            <div className="package-admin-table" style={{textAlign: 'center'}}>
            <table class="center" style={{width:"25%" ,textAlign:"center", fontSize:'17px', marginBottom:"50px", marginLeft: "auto", marginRight: "auto"}}>
                <tr>
                    <th>Nombre del plan</th>
                    <th>Comidas</th>
                </tr>
                <tr>
                    <td>Plan 1</td>
                    <td>Arroz, Frijoles, Pollo</td>
                </tr>
                <tr>
                    <td>Plan 2</td>
                    <td>Arroz, Frijoles, Pescado</td>
                </tr>
            </table>
            </div>
            <div className="planesa-admin-group" style={{textAlign: 'center'}}>
                <Formik  onSubmit={(data)=>{console.log(data)}}
                    initialValues = {{
                        nombrePlan: "",
                        comidas: "",
                        accionPlan: "Crear"
                    }}>
                        {({values, handleSubmit}) =>  
                        <form onSubmit={handleSubmit}>
                            <Field name="nombrePlan" placeholder="Nombre del plan" component={InputField}/>
                            <Field name="comidas" placeholder="Comidas" component={InputField}/>
                            <div>
                                <Field component={SelectField} name="accionPlan" >
                                    <option name="crearPlan">Crear</option>
                                    <option name="eliiminarPlan">Eliminar</option>
                                    <option name="actualizarPlan">Actualizar</option>
                                </Field>
                            </div>
                            <div className="form-buttns" style={{textAlign: 'center'}}>
                                <button type="submit">Enviar</button>
                            </div>
                        </form>  }
    
                </Formik>

                <style jsx>{`

                .planesa-admin-group button {
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

                .planesa-admin-group button:hover {
                    color: #000000;
                    background-color: #42c8f5;
                }
                `}</style>
            </div>
        </div>
    )
}