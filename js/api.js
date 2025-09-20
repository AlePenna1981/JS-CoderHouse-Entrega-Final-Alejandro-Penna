async function obtenerLibros(titulo) {
    const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}`);
    const data = await response.json();

    const libros = data.docs.map((book) => {
        return {
            titulo: book.title,
            autor: book.author_name ? book.author_name.join(", ") : "Autor desconocido",
            portada: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "https://via.placeholder.com/150x200?text=Sin+Portada"
        };
    });
    mostrarLibros(libros, titulo);
}
