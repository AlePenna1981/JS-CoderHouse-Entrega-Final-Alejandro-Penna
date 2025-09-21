const miLibreria = document.getElementById('miLibreria');

// Cargar librería desde localStorage
function cargarDesdeStorage() {
    const data = JSON.parse(localStorage.getItem("miLibreria")) || [];
    data.forEach(libro => renderLibro(libro));
}
cargarDesdeStorage();

function cargarEnMiLibreria(book) {
    Swal.fire({
        title: "¿Deseas añadir este título a tu librería?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí"
    }).then((result) => {
        if (result.isConfirmed) {
            renderLibro(book);
            guardarEnStorage(book);
            Swal.fire({
                title: "Agregado!",
                text: `${book.titulo} ha sido añadido a tu librería!`,
                icon: "success"
            });
        }
    });
}

function renderLibro(book) {
    const div = document.createElement("div");
    div.classList.add("libro");

    const img = document.createElement("img");
    img.src = book.portada;
    img.alt = book.titulo;

    const tituloSmall = document.createElement("small");
    tituloSmall.textContent = book.titulo;

    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = 'Eliminar';


    btnBorrar.addEventListener("click", () => {

        Swal.fire({
            title: "¿Deseas eliminar este título de tu librería?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí"
        }).then((result) => {
            if (result.isConfirmed) {
                div.remove();
                eliminarDeStorage(book.titulo);
                Swal.fire({
                    title: "Titulo eliminado",
                    text: `${book.titulo} ha sido eliminado de tu librería!`,
                    icon: "success"
                });
            }
        });


    });

    div.appendChild(img);
    div.appendChild(tituloSmall);
    div.appendChild(btnBorrar);
    miLibreria.appendChild(div);
}

// Guardar libro en localStorage
function guardarEnStorage(libro) {
    const data = JSON.parse(localStorage.getItem("miLibreria")) || [];
    if (!data.some(l => l.titulo === libro.titulo)) {
        data.push(libro);
        localStorage.setItem("miLibreria", JSON.stringify(data));
    }
}

// Eliminar libro de localStorage
function eliminarDeStorage(titulo) {
    let data = JSON.parse(localStorage.getItem("miLibreria")) || [];
    data = data.filter(libro => libro.titulo !== titulo);
    localStorage.setItem("miLibreria", JSON.stringify(data));
}
