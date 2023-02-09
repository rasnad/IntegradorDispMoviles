Inicio();
const URLBASE = "https://ort-tallermoviles.herokuapp.com/api"
ListarProductos();

function Inicio() {
    Eventos();
}

function Eventos() {
    document.querySelector("#btnRegistrar").addEventListener("click", TomarDatosRegistro);
    document.querySelector("#btnLogin").addEventListener("click", TomarDatosLogin);
    document.querySelector("#btnListar").addEventListener("click", VerProducto);
}

function TomarDatosLogin() {
    let e = document.querySelector("#txtLoginEmail").value;
    let p = document.querySelector("#txtLoginPass").value;

    let l = new LoginDTO(e, p);

    Login(l) // Le pasamos el nuevo objeto LoginDTO
}



function Login(datos) {

    fetch(`${URLBASE}/usuarios/session`, { // vemos el url correspondiente en la documentacion.
        method: "POST",
        headers: { // los headers tambien en la documentacion
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos) // usu se convierte en Json.
    }).then(function (response) {  // then tiene una funcion que recibe la response 

        console.log(response)
        return response.json();

    }).then(function (data) {

        if (data.error == "") {
            localStorage.setItem("apikey", data.data.token)// atributo data del objeto data, que tiene
            // un atributo token
            document.querySelector("#pLoginRes").innerHTML = "Login exitoso"
        } else {
            document.querySelector("#pLoginRes").innerHTML = data.error;
        }

    }).catch(function (error) {

    })

}

function ListarProductos() {

  //  document.querySelector("#pReListar").innerHTML = "";

    let apikey = localStorage.getItem("apikey"); // conseguimos la key del login.
    fetch(`${URLBASE}/productos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth": apikey // le brinda,mos la apikey
        },
    }).then(function (response) {

        console.log(response)
        if (response.status == 200) {
            return response.json();
        } else {
            document.querySelector("#pReListar").innerHTML = response.status; // Si no nos da status 200, es decir Okay, le pasamos el status del response a un parrafo.
            return response;
        }

    }).then(function (data) { // data.data ya que el objeto trae la lista en el atributo "data"
        console.log(data);

        if (data != undefined) {
            for (let p of data.data) {
                document.querySelector("#slcProducto").innerHTML += `<option value="${p._id}">${p.nombre}</option>`;
            }
        }
    }).catch(function (error) {
        console.log(error);
    })

}


function VerProducto() {

    let idP = document.querySelector("#slcProducto").value;

    let apikey = localStorage.getItem("apikey"); // conseguimos la key del login.

    fetch(`${URLBASE}/productos/${idP}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-auth": apikey // le brinda,mos la apikey
        },
       
    }).then(function (response) {

        console.log(response)
        if(response.status == 200){
            return response.json();
        }  
        else {
            document.querySelector("#presListar").innerHTML = response.statusText;
        }

    }).then(function (data) {
        console.log(data)
        if (data != undefined) {
                document.querySelector("#pReListar").innerHTML += `${"Nombre:" + data.data.nombre + " // Precio:" + data.data.precio + " // Stock : " + data.data.estado}</br>`;
        }

    }).catch(function (error) {

        console.log(error);

    })
}


function TomarDatosRegistro() {

    let n = document.querySelector("#txtRegistroNombre").value;
    let a = document.querySelector("#txtRegistroApellido").value;
    let d = document.querySelector("#txtRegistroDir").value;
    let e = document.querySelector("#txtRegistroEmail").value;
    let p = document.querySelector("#txtRegistroPass").value;


    let usu = new Usuario(n, a, d, e, p)
    console.log(usu);

    fetch(`${URLBASE}/usuarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usu) // usu se convierte en Json.
    }).then(function (response) {  // then tiene una funcion que recibe la response 
        return response.json();
    }).then(function (data) {

        console.log(data)
        let msg = data.error;
        if (msg == "") {
            document.querySelector("#pRegistroRes").innerHTML = "Alta Correcta";
        } else {
            document.querySelector("#pRegistroRes").innerHTML = data.error;
        }

    }).catch(function (error) {
        document.querySelector("#pRegistroRes").innerHTML = "Error";
    })




}