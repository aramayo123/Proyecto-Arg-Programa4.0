

const formNuevo = document.querySelector('#nueva-publicacion');
var lastTimeout;

formNuevo.addEventListener('submit', async (e) => {
    e.preventDefault();
    let inputs = formNuevo.querySelectorAll("input, textarea");
    let mensajes = document.querySelector('#mensajes');
    let cortar = false;
    mensajes.innerHTML = ``;

    inputs.forEach( (input) => {
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
    })

    if(cortar){
        mensajes.innerHTML = `
            <div class="bg-danger rounded w-50 container py-2">
                <h4 class="text-center">Por favor revisa los campos marcados</h4>
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


    // Enviar los datos al servidor para crear la nueva publicación
    const respuesta = await fetch('/publicacion', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const datos = await respuesta.json()
    console.log(datos);

    mensajes.innerHTML = `
        <div class="bg-success rounded w-50 container py-2">
            <h4 class="text-center">${datos.msg}</h4>
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
    //location.href = "/"
})