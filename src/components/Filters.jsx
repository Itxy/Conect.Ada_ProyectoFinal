import {useState, useEffect} from 'react'

function Filters({filtered, setFilter}) {
  return (
    <div className="filtros sombra contenedor">
        <form>
            <div className="campo">
                <label>Filtrar gastos</label>
                <select value={filtered} onChange={event => setFilter(event.target.value)}>
                    <option value="">Todos los gastos</option>
                    <option value="Ahorro">Ahorro</option>
                    <option value="Comida">Comida</option>
                    <option value="Casa">Casa</option>
                    <option value="Otros">Otros gastos</option>
                    <option value="Ocio">Ocio</option>
                    <option value="Salud">Salud</option>
                    <option value="Suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filters