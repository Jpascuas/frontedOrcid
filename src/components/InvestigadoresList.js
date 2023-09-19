// src/components/InvestigadoresList.js
import React, { useState, useEffect } from 'react';
import '../assets/css/styles.css'; // Importa tus estilos desde la carpeta assets
import { eliminarInvestigador, cargarPagina } from '../services/api'; // Importa las funciones del servicio

function InvestigadoresList() {
  const [error, setError] = useState(null);
  const [investigadores, setInvestigadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Función para cargar datos de la página actual
    cargarPagina(currentPage)
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setInvestigadores(data.data);
          setTotalPages(data.meta.last_page);
        } else {
          throw new Error('La respuesta no contiene una matriz de investigadores válida');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al listar investigadores:', error);
        setLoading(false);
        setError(error);
      });
  }, [currentPage]);

  const handleEliminarInvestigador = (orcid) => {
    eliminarInvestigador(orcid)
      .then((data) => {
        if (data.message === 'Investigador eliminado correctamente') {
          alert(data.message);
          setInvestigadores((prevInvestigadores) =>
            prevInvestigadores.filter((investigador) => investigador.orcid !== orcid)
          );
        } else {
          alert('No se pudo eliminar al investigador.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar investigador:', error);
        alert('Error al eliminar al investigador.');
      });
  };

  return (
    <div>
      <h1>Lista de Investigadores</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : investigadores.length === 0 ? (
        <p>No hay investigadores disponibles.</p>
      ) : (
        <div className="table-container">
          <table className="investigadores-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>ORCID</th>
                <th>Correo Principal</th>
                <th>Palabras Clave</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {investigadores.map((investigador) => (
                <tr key={investigador.orcid}>
                  <td>{investigador.nombre} {investigador.apellido}</td>
                  <td>{investigador.orcid}</td>
                  <td>{investigador.correo_principal}</td>
                  <td>
                    <ul>
                      {investigador.palabras_clave.map((palabra, index) => (
                        <li key={index}>{palabra}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => handleEliminarInvestigador(investigador.orcid)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={i + 1 === currentPage ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InvestigadoresList;