import React, { useEffect, useState } from 'react'
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes';

const App = () => {

  // state de la app
  const [busqueda, setBusqueda] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const [paginaactual, setPaginaactual] = useState(1);
  const [totalpaginas, setTotalpaginas] = useState(1);


  useEffect(() => {

    const consultarApi = async () => {
      if (busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = '19713860-502f04b8b6a40184220a2639d';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      setImagenes(resultado.hits);

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      setTotalpaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' })

    }
    consultarApi();

  }, [busqueda, paginaactual])


  // definir la pagina anterior
  const paginaAnterior = () => {

    const nuevaPaginaActual = paginaactual - 1;

    if (nuevaPaginaActual === 0) return;

    setPaginaactual(nuevaPaginaActual)
  }

  //definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    setPaginaactual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center" >Buscador de Imagenes</p>
        <Formulario
          setBusqueda={setBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {(paginaactual === 1) ? null :
          <button
            type="button"
            className="btn btn-info mr-1 "
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>}


        {(paginaactual === totalpaginas) ? null :
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>}


      </div>

    </div>
  )
}

export default App
