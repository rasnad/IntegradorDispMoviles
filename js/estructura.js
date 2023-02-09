

class Usuario{
    constructor(nombre, apellido, direccion, email, pass){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.email = email;
        this.password = pass; // api pide no menor a 8 caract.
    }
}

class LoginDTO{ // DTO data transfer object.
    constructor(e, p){
        this.email = e;
        this.password = p;
    }
}