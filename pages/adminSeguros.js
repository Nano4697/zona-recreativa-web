import Layout from './components/GeneralLayout';
import AdminNavigation from './components/AdminNavigation';
import { Formik, Field } from 'formik';

const InputField = ({
    field,
    form: _,
    ...props
    }) => {
    return (
        <div>
            <input style={{marginTop:5, marginBottom:15 , padding:10}} {...field} {...props} />
        </div>
    );
};

const SelectField = ({
    field,
    form: _,
    ...props
    }) => {
    return (
        <div>
            <select style={{marginTop:20, marginBottom:10 , padding:10}} {...field} {...props}/>
        </div>
    );
};

export default function adminSeguros ()
{       return(
        <div>
            <AdminNavigation />
            <Layout>
                <div className="row justify-content-center">
                    <h1 className="mt-2 mb-4">
                        Administración de seguros laborales
                    </h1>
                </div>
                <div className="package-admin-table" style={{textAlign: 'center'}}>
                <table class="center" style={{width:"25%" ,textAlign:"center", fontSize:'17px', marginBottom:"50px", marginLeft: "auto", marginRight: "auto"}}>
                    <thead>
                        <tr>
                            <th>Nombre de la persona</th>
                            <th>Cédula de la persona</th>
                            <th>Número de seguro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Persona 1</td>
                            <td>123456</td>
                            <td>123456</td>
                        </tr>
                        <tr>
                            <td>Persona 2</td>
                            <td>654321</td>
                            <td>654321</td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="sL-admin-group" style={{textAlign: 'center'}}>
                    <Formik  onSubmit={(data)=>{alert(JSON.stringify(data))}}
                        initialValues = {{
                            nombrePersona: "",
                            cedulaPersona: "",
                            numeroSeguro: "",
                            accionSeguro: "Crear"
                        }}>
                            {({handleSubmit}) =>
                            <form onSubmit={handleSubmit}>
                                <Field name="nombrePersona" placeholder="Nombre de la persona" component={InputField}/>
                                <Field name="cedulaPersona" placeholder="Cédula de la persona" component={InputField}/>
                                <Field name="numeroSeguro" placeholder="Número de seguro" component={InputField}/>
                                <Field component={SelectField} name="accionSeguro" >
                                        <option name="crearSeguro">Crear</option>
                                        <option name="eliiminarSeguro">Eliminar</option>
                                        <option name="actualizarSeguro">Actualizar</option>
                                </Field>
                                <div className="form-buttns" style={{textAlign: 'center'}}>
                                    <button type="submit">Enviar</button>
                                </div>
                            </form>  }

                    </Formik>

                    <style jsx>{`
                    .sL-admin-group button {
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
                    .sL-admin-group button:hover {
                        color: #000000;
                        background-color: #42c8f5;
                    }
                    `}</style>
                </div>
            </Layout>
        </div>
    )
}
