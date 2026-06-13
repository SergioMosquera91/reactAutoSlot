import axios from 'axios';

export class UsuarioService {

    baseUrl = 'http://localhost:8080/usuario';

    getAll() {
        return axios.get(this.baseUrl + "/listar")
            .then(response => response.data);
    }

    guardar(usuario) {
        return axios.post(this.baseUrl + "/nuevo", usuario)
            .then(response => response.data);
    }

    editar(id, usuario) {
        return axios.put(this.baseUrl + `/editar/${id}`, usuario)
            .then(response => response.data);
    }

    eliminar(id) {
        return axios.delete(this.baseUrl + `/eliminar/${id}`)
            .then(response => response.data);
    }
}