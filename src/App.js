import './App.css';
import 'primeicons/primeicons.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";


        
        
import { UsuarioService } from './services/UsuarioService.js';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Component } from 'react';
import { Panel } from 'primereact/panel';

import { Menubar } from 'primereact/menubar';
        

//importar los componenentes  para la creacion de la tabla

export default class App extends Component {

constructor(){
  super();
 this.state = {
    usuarios:[]
};
this.items=[
  {
    label:"Nuevo",
    icon:"pi pi-fw pi-user-plus",
    command:()=>{alert('Save' )}
  },
  {
    label:"Editar",
    icon:"pi pi-fw pi-user-edit",
    command:()=>{alert('Edited' )}
  },
  {
    label:"Eliminar",
    icon:"pi pi-fw pi-user-minus",
    command:()=>{alert('Delete' )}
  },
];
this.UsuarioService=new UsuarioService();
};

componentDidMount(){
  this.UsuarioService.getAll().then(data =>
      this.setState({usuarios:data})
  );
}

//metodo para cargar los datos de la tabla al iniciar la aplicacion
render(){
        return (
          <div style={{width:'80%', margin:'40px', auto:'0px'}}>
            <Menubar model={this.items}/>;
            <br/> 
          <Panel header="Gestion Usuarios" >

            <DataTable value={this.state.usuarios}>

                <Column field="idUsuario" header="ID"></Column>

                <Column field="nombreUsuario" header="Nombre"></Column>

                <Column field="contrasena" header="Contraseña"></Column>

                <Column field="nombreCompleto" header="Nombre Completo"></Column>

                <Column field="correo" header="Email"></Column>

                <Column field="telefono" header="Telefono"></Column>

                <Column field="cedulaNit" header="N de Documento"></Column>

                <Column field="estado" header="Estado de Usuario"></Column>

                <Column field="fechaRegistro" header="Fecha"></Column>


            </DataTable>

            </Panel>
            </div>

        );
      };
    } 