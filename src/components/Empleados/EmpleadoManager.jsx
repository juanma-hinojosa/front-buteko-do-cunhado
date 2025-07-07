import React, { useState } from "react";
import CrearEmpleado from "./createEmpleados";
import ListadoEmpleados from "./EmployeeList";

const EmpleadoManager = () => {
  const [vista, setVista] = useState("listar");

  return (
    <div className="empleado-manager">
      <h3 className="poppins-semibold">Gestión de Empleados</h3>
      <div className="btn-group poppins-regular"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          // padding: "2rem"
        }}
      >
        <button className='poppins-light' style={{ padding: "5px 10px" }} onClick={() => setVista("crear")}>Crear Empleado</button>
        <button className='poppins-light' style={{ padding: "5px 10px" }} onClick={() => setVista("listar")}>Listado de Empleados</button>
      </div>
      <br />
      <hr />
      <div className="contenido">
        {vista === "crear" && <CrearEmpleado />}  
        {vista === "listar" && <ListadoEmpleados />}
      </div>
    </div>
  );
};

export default EmpleadoManager;
