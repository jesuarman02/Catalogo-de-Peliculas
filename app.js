class Catalogo {
    #peliculas = [];

    agregarPelicula(titulo, director, year) {
        const pelicula = { id: Date.now(), titulo, director, year };
        this.#peliculas.push(pelicula);
    }

    mostrarPeliculas() {
        const tablaCuerpo = document.getElementById('tablaCuerpo');
        tablaCuerpo.innerHTML = '';
        this.#peliculas.forEach((pelicula, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td>${pelicula.titulo}</td>
                <td>${pelicula.director}</td>
                <td>${pelicula.year}</td>
                <td><button class="btn btn-primary btn-editar" data-index="${index}">Editar</button></td>
                <td><button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button></td>
            `;
            tablaCuerpo.appendChild(row);
        });

        const tablaPeliculas = document.getElementById('tablaPeliculas');
        tablaPeliculas.className = 'table table-striped table-bordered';
        tablaPeliculas.style.display = 'block';

        tablaCuerpo.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                this.editarPelicula(parseInt(index));
            });
        });

        tablaCuerpo.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                this.eliminarPelicula(parseInt(index));
            });
        });
    }

    editarPelicula(index) {
        const pelicula = this.#peliculas[index];
    
        Swal.fire({
            title: 'Editar Película',
            html:
                `<input id="titulo-edit" class="swal2-input" placeholder="Título" value="${pelicula.titulo}">` +
                `<input id="director-edit" class="swal2-input" placeholder="Director" value="${pelicula.director}">` +
                `<input id="year-edit" class="swal2-input" placeholder="Año" value="${pelicula.year}">`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('titulo-edit').value,
                    document.getElementById('director-edit').value,
                    document.getElementById('year-edit').value
                ];
            }
        }).then((result) => {
            const [titulo, director, year] = result.value;
            if (titulo && director && year) {
                this.#peliculas[index] = { ...pelicula, titulo, director, year: parseInt(year) };
                this.mostrarPeliculas();
                Swal.fire('¡Éxito!', 'Película editada exitosamente', 'success');
            } else {
                Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
            }
        });
    }
    

    eliminarPelicula(index) {
        this.#peliculas.splice(index, 1);
        this.mostrarPeliculas();
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
        Swal.fire({
            title: '¡Bien!',
            text: 'Pelicula agregada exitosamente',
            icon: 'success',
            confirmButtonColor: '#4CAF50',
        });
    } else {
        Swal.fire({
            title: '¡Error!',
            text: 'Por favor, completa todos los campos',
            icon: 'error',
            confirmButtonColor: '#dd0813',
        });
    }
});

document.getElementById('mostrar').addEventListener('click', () => {
    catalogo.mostrarPeliculas();
});

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '8.jpg',
        '9.jpg',
        '10.jpg'
    ];

    let currentIndex = 0;
    const imagenes1 = document.querySelector('.imagenes1');

    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length;
        imagenes1.src = images[currentIndex];
    }

    setInterval(changeImage, 15000);
});
