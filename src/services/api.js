// Coloca tus funciones para interactuar con la API aquí
export async function cargarPagina(pageNumber) {
    // Lógica para cargar la página
    const response = await fetch(`http://127.0.0.1:8000/api/orcid/list?page=${pageNumber}`);
    if (!response.ok) {
      throw new Error('No se pudo cargar la lista de investigadores');
    }
    return response.json();
  }
  
  export async function eliminarInvestigador(orcid) {
    // Lógica para eliminar un investigador
    const response = await fetch(`http://127.0.0.1:8000/api/orcid/delete/${orcid}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('No se pudo eliminar al investigador');
    }
    return response.json();
  }