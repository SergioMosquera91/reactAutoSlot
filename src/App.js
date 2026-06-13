import './App.css';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { UsuarioService } from './services/UsuarioService.js';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Component } from 'react';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            usuarios: [],
            dialogVisible: false,
            usuarioSeleccionado: null,
            modoEdicion: false,
            form: {
                nombreUsuario: '',
                contrasena: '',
                nombreCompleto: '',
                correo: '',
                telefono: '',
                cedulaNit: '',
                estado: 'activo'
            }
        };

        this.estadoOpciones = [
            { label: 'Activo', value: 'activo' },
            { label: 'Bloqueado', value: 'bloqueado' },
            { label: 'Inactivo', value: 'inactivo' }
        ];

        this.usuarioService = new UsuarioService();

        this.items = [
            {
                label: "Nuevo",
                icon: "pi pi-fw pi-user-plus",
                command: () => this.abrirNuevo()
            },
            {
                label: "Editar",
                icon: "pi pi-fw pi-user-edit",
                command: () => this.abrirEditar()
            },
            {
                label: "Eliminar",
                icon: "pi pi-fw pi-user-minus",
                command: () => this.confirmarEliminar()
            },
        ];
    }

    componentDidMount() {
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        this.usuarioService.getAll().then(data =>
            this.setState({ usuarios: data })
        );
    }

    abrirNuevo() {
        this.setState({
            modoEdicion: false,
            form: {
                nombreUsuario: '',
                contrasena: '',
                nombreCompleto: '',
                correo: '',
                telefono: '',
                cedulaNit: '',
                estado: 'activo'
            },
            dialogVisible: true
        });
    }

    abrirEditar() {
        const { usuarioSeleccionado } = this.state;
        if (!usuarioSeleccionado) {
            alert('Selecciona un usuario de la tabla primero');
            return;
        }
        this.setState({
            modoEdicion: true,
            form: { ...usuarioSeleccionado },
            dialogVisible: true
        });
    }

    confirmarEliminar() {
        const { usuarioSeleccionado } = this.state;
        if (!usuarioSeleccionado) {
            alert('Selecciona un usuario de la tabla primero');
            return;
        }
        confirmDialog({
            message: `¿Eliminar a ${usuarioSeleccionado.nombreCompleto}?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.eliminar()
        });
    }

    eliminar() {
        const { usuarioSeleccionado } = this.state;
        this.usuarioService.eliminar(usuarioSeleccionado.idUsuario).then(() => {
            this.cargarUsuarios();
            this.setState({ usuarioSeleccionado: null });
        });
    }

    guardar() {
        const { form, modoEdicion, usuarioSeleccionado } = this.state;
        if (modoEdicion) {
            this.usuarioService.editar(usuarioSeleccionado.idUsuario, form).then(() => {
                this.cargarUsuarios();
                this.setState({ dialogVisible: false });
            });
        } else {
            this.usuarioService.guardar(form).then(() => {
                this.cargarUsuarios();
                this.setState({ dialogVisible: false });
            });
        }
    }

    actualizarForm(campo, valor) {
        this.setState(prev => ({
            form: { ...prev.form, [campo]: valor }
        }));
    }

    render() {
        const { usuarios, dialogVisible, modoEdicion, form, usuarioSeleccionado } = this.state;

        return (
            <div style={{ width: '90%', margin: '40px auto' }}>
                <ConfirmDialog />
                <Menubar model={this.items} />
                <br />
                <Panel header="Gestión de Usuarios">
                    <DataTable
                        value={usuarios}
                        selectionMode="single"
                        selection={usuarioSeleccionado}
                        onSelectionChange={e => this.setState({ usuarioSeleccionado: e.value })}
                        dataKey="idUsuario"
                    >
                        <Column field="idUsuario" header="ID" />
                        <Column field="nombreUsuario" header="Usuario" />
                        <Column field="nombreCompleto" header="Nombre Completo" />
                        <Column field="correo" header="Email" />
                        <Column field="telefono" header="Teléfono" />
                        <Column field="cedulaNit" header="Documento" />
                        <Column field="estado" header="Estado" />
                        <Column field="fechaRegistro" header="Fecha Registro" />
                    </DataTable>
                </Panel>

                <Dialog
                    header={modoEdicion ? "Editar Usuario" : "Nuevo Usuario"}
                    visible={dialogVisible}
                    style={{ width: '500px' }}
                    onHide={() => this.setState({ dialogVisible: false })}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <InputText placeholder="Nombre de usuario" value={form.nombreUsuario}
                            onChange={e => this.actualizarForm('nombreUsuario', e.target.value)} />
                        <InputText placeholder="Contraseña" type="password" value={form.contrasena}
                            onChange={e => this.actualizarForm('contrasena', e.target.value)} />
                        <InputText placeholder="Nombre completo" value={form.nombreCompleto}
                            onChange={e => this.actualizarForm('nombreCompleto', e.target.value)} />
                        <InputText placeholder="Correo" value={form.correo}
                            onChange={e => this.actualizarForm('correo', e.target.value)} />
                        <InputText placeholder="Teléfono" value={form.telefono}
                            onChange={e => this.actualizarForm('telefono', e.target.value)} />
                        <InputText placeholder="Cédula/NIT" value={form.cedulaNit}
                            onChange={e => this.actualizarForm('cedulaNit', e.target.value)} />
                        <Dropdown value={form.estado} options={this.estadoOpciones}
                            onChange={e => this.actualizarForm('estado', e.value)}
                            placeholder="Selecciona estado" />
                        <Button label="Guardar" icon="pi pi-save"
                            onClick={() => this.guardar()} />
                    </div>
                </Dialog>
            </div>
        );
    }
}