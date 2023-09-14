const mostrarPublicaciones = (publicaciones, elementoHtml) => {

    let secciones = "";
    publicaciones.forEach( (pub) => {
        secciones += `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${pub.titulo}
                </th>
                <td class="px-6 py-4">
                    ${pub.autor}
                </td>
                <td class="px-6 py-4">
                    <img class="w-1/3 h-1/2" width="150" src="${pub.url_imagen}" alt="${pub.titulo}">
                </td>
                <td class="px-6 py-4">
                    ${pub.fecha}
                </td>
                <td class="px-6 py-4">
                    <div class="flex flex-cols-2 gap-5">
                        <a href="/editar/${pub.id}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        <button onclick="EliminarPublicacion(${pub.id})" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Eliminar</button>
                    </div>
                </td>
            </tr>
        `
    })

    elementoHtml.innerHTML = secciones;
    
}

const obtenerPublicaicones = async () => {
    const response = await fetch('/publicaciones')
    const data = await response.json()
    return data;
}



document.addEventListener('DOMContentLoaded', async () => {
    
    const publicaciones = await obtenerPublicaicones()
    const main = document.querySelector('#cargar-tabla')
    mostrarPublicaciones(publicaciones, main)
})

async function EliminarPublicacion(id){
    const url = '/publicacion/' + id;
    // Enviar los datos al servidor para crear la nueva publicación
    const respuesta = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const datos = await respuesta.json();
    alert(datos.msg);
    location.href = "/admin";
}