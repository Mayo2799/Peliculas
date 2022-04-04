const contenedor = document.querySelector("#contenedor");
const pelicula = document.querySelector("#pelicula");
const btnBuscar = document.querySelector("#btnBuscar");
const pantallaPeliculas = document.querySelector("#pantallaPeliculas");
const apiKey = "19846e81";
btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  obtenerPeliculas(pelicula.value);
  pelicula.value = "";
});
const obtenerPeliculas = async (pelicula) => {
  contenedor.innerHTML = "";
  const endpoint = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${pelicula}`;
  const respuesta = await fetch(endpoint);
  const datosPeliculas = await respuesta.json();
  const { Search } = datosPeliculas;
  mostarPeliculas(Search);
};
const mostarPeliculas = (peliculas) => {
  peliculas.map(
    ({
      Poster: Imagen,
      Title: Titulo,
      Type: Tipo,
      Year: Anio,
      imdbID: BaseDatosPeliculas,
    }) => {
      let peliculaHTML = `
      <div class="tarjeta" id="pantallaPeliculas">
        <header class="encabezado-tarjeta">
        ${
          Imagen === "N/A"
            ? `<img class="img" src="img/error.jpg" alt="Imagen de la película no se encuentra">`
            : `<img class="img" src="${Imagen}" alt="Película ${Titulo}">`
        }
        </header>
        <div class="contenido-tarjeta">
          <h2>${Titulo}</h2>
          <p><b>Tipo:</b> ${
            Tipo === "series" ? "Series" : Tipo === "movie" ? "Película" : ""
          } </p>
          <p><b>Año:</b> ${Anio}</p>
        </div>
        <footer class="pie-tarjeta">
          <a class="enlace" href="https://www.imdb.com/title/${BaseDatosPeliculas}" target="_blank">Ver esta película en IMDB</a>
        </footer>
      </div>`;
      contenedor.innerHTML += peliculaHTML;
    }
  );
};
