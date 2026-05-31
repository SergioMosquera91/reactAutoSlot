import axios from 'axios';

export class UsuarioService {

    baseUrl = 'http://localhost:8080/usuario';

    getAll() {
        return axios
            .get(this.baseUrl + "/listar")
            .then(response => response.data);
    }
}