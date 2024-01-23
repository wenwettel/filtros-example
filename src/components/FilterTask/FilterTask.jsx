import React from 'react';

function FilterTask({ handleChange, value }) {
  return (
    <div>
      <label htmlFor="filter">Filtras por estado</label>
      <select name="select" id="filter" onChange={handleChange} value={value}>
        <option value="all">Todos</option>
        <option value="completed">completado</option>
        <option value="uncompleted">sin completar</option>
      </select>
    </div>
  );
}

export default FilterTask;
