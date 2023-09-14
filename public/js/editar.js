

const formNuevo = document.querySelector('#nueva-publicacion');
var lastTimeout;

formNuevo.addEventListener('submit', async (e) => {
    e.preventDefault();
    let inputs = formNuevo.querySelectorAll("input, textarea");
    let mensajes = document.querySelector('#mensajes');
    let cortar = false;
    mensajes.innerHTML = ``;

    inputs.forEach( (input) => {
        if(input.id != 'id_publicacion'){
            let error = document.querySelector(`#error_${input.id}`);
            error.innerHTML = ``;
            input.classList.remove("input-good");
            input.classList.remove("input-warning");
            if(!input.value.length){
                error.innerHTML = `El campo ${input.id} es requerido`;
                input.classList.add("input-warning");
                cortar = true;
            }else
                input.classList.add("input-good");
        }
    })

    if(cortar){
        mensajes.innerHTML = `
            <div class=" mx-auto my-5 bg-red-500">
                <p class="p-2 m-2 text-center">Por favor revisa los campos marcados</p>
            </div>
        `;
        clearTimeout(lastTimeout);
        lastTimeout = setTimeout(() => {
            mensajes.innerHTML = "";
        }, 3000);
        return
    }
    const data = {
        autor: document.querySelector('#autor').value,
        titulo: document.querySelector('#titulo').value,
        detalle: document.querySelector('#detalle').value,
        url_imagen: document.querySelector('#url_imagen').value,
        fecha: document.querySelector('#fecha').value,
    }

    const url = '/publicacion/' + document.querySelector('#id_publicacion').value;
    // Enviar los datos al servidor para crear la nueva publicación
    const respuesta = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const datos = await respuesta.json()
    console.log(datos);

    mensajes.innerHTML = `
        <div class="w-4/5 mx-auto my-5 bg-green-500 w-1/3">
            <p class="p-2 m-2 text-center">${datos.msg}</p>
        </div>
    `;
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(() => {
        mensajes.innerHTML = "";
    }, 3000);

    inputs.forEach( (input) => {
        input.classList.remove("input-good");
        input.classList.remove("input-warning");
    });
    
    formNuevo.reset();
    setTimeout(() => {
        location.href = "/";
    }, 1000);
    //location.href = "/"
})