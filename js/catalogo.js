function mostrarLibros(libros, tituloBuscado) {
    const container = document.getElementById("books");
    container.innerHTML = "";

    if (libros.length === 0) {
        Swal.fire({
            text: `No se encontró el título ${tituloBuscado}`,
            icon: 'question',
            confirmButtonText: 'Volver'
        });
        return;
    }

    libros.forEach(libro => {
        const div = document.createElement("div");
        div.classList.add("book");

        const img = document.createElement("img");
        img.src = libro.portada;
        img.alt = libro.titulo;

        const title = document.createElement("h5");
        title.textContent = libro.titulo;

        const author = document.createElement("small");
        author.textContent = `Autor: ${libro.autor}`;

        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(author);
        container.appendChild(div);

        img.addEventListener('click', () => {
            cargarEnMiLibreria(libro);
        });
    });
}

// capturar input + botón
document.getElementById("searchBtn").addEventListener("click", () => {
    const titulo = document.getElementById("searchInput").value.trim();
    if (titulo) {
        obtenerLibros(titulo);
    }
});
