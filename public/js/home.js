const mostrarPublicaciones = (publicaciones, elementoHtml) => {

    let secciones = "";
    publicaciones.forEach( (pub) => {
        secciones += `
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-1/3 h-1/2" width="150" src="${pub.url_imagen}" alt="${pub.titulo}">
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">${pub.titulo}</div>
                    <p class="text-gray-700 text-base">
                    ${pub.detalle}
                    </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${pub.fecha}</span>
                </div>
            </div>
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
    const main = document.querySelector('#lista-publicaciones')
    mostrarPublicaciones(publicaciones, main)
})