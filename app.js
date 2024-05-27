class Catalogo {
    #peliculas = [];

    agregarPelicula(titulo, director, year) {
        const pelicula = { id: Date.now(), titulo, director, year };
        this.#peliculas.push(pelicula);
        this.mostrarPeliculas();
    }

    editarPelicula(id, nuevoTitulo, nuevoDirector, nuevoYear) {
        const pelicula = this.#peliculas.find(p => p.id === id);
        if (pelicula) {
            pelicula.titulo = nuevoTitulo;
            pelicula.director = nuevoDirector;
            pelicula.year = nuevoYear;
            this.mostrarPeliculas();
        }
    }

    eliminarPelicula(id) {
        this.#peliculas = this.#peliculas.filter(p => p.id !== id);
        this.mostrarPeliculas();
    }

    mostrarPeliculas() {
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = '';
        this.#peliculas.forEach(pelicula => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><strong>${pelicula.titulo}</strong> (${pelicula.year}) - ${pelicula.director}</span>
                <div class="actions">
                    <button onclick="editarPelicula(${pelicula.id})">Editar</button>
                    <button onclick="eliminarPelicula(${pelicula.id})">Eliminar</button>
                </div>
            `;
            movieList.appendChild(li);
        });
    }
}

const catalogo = new Catalogo();

document.getElementById('validar').addEventListener('click', () => {
    const titulo = document.getElementById('titulo').value;
    const director = document.getElementById('director').value;
    const year = document.getElementById('year').value;

    if (titulo && director && year) {
        catalogo.agregarPelicula(titulo, director, parseInt(year));
        document.getElementById('titulo').value = '';
        document.getElementById('director').value = '';
        document.getElementById('year').value = '';
    } else {
        alert('Por favor, completa todos los campos');
    }
});

function editarPelicula(id) {
    const nuevoTitulo = prompt('Nuevo título:');
    const nuevoDirector = prompt('Nuevo director:');
    const nuevoYear = prompt('Nuevo año:');
    if (nuevoTitulo && nuevoDirector && nuevoYear) {
        catalogo.editarPelicula(id, nuevoTitulo, nuevoDirector, parseInt(nuevoYear));
    } else {
        alert('Por favor, completa todos los campos');
    }
}

function eliminarPelicula(id) {
    catalogo.eliminarPelicula(id);
}

catalogo.mostrarPeliculas();
