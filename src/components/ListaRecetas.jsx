import { useReducer } from "react";
import { useForm } from "../Hooks/useForm";

const listaRecetas = [
  {
    id: 1,
    nombre_receta: "Pastas con pollo",
    nivel_dificultad: "4%",
    bajaAzucar: "false",
    ingredientes: "Pastas la muñeca, pollo desmechado, bajos en aceite",
  },
];

const nuevaReceta = {
  id: 2,
  nombre_receta: "Pita de pollo",
  nivel_dificultad: "6%",
  bajaAzucar: "false",
  ingredientes: "crema de leche, pollo desmechado, pasas, 0.02% de azucar",
};

// const agregarTarea = {
//   type: "[Recetas], Agregar receta",
//   payload: nuevaReceta,
// };
const ediarTarea = {
  type: "[Recetas], ediarTarea",
  payload: nuevaReceta,
};
const eliminarTarea = {
  type: "[Recetas], eliminarTarea",
};
const eliminarTareas = {
  type: "[Recetas], eliminarTareas",
};

const recetaReducer = (newReceta = listaRecetas, action = {}) => {
  switch (action.type) {
    case "[Recetas], Agregar tarea receta":
      return [...newReceta, action.payload];

    case "[Recetas], ediarReceta":
      console.log("editar receta");
      return [...newReceta, action.payload];
    case "[Recetas], eliminarTarea":
      // return [...newReceta, action.payload];
      console.log("Eliminar una receta");
    case "[Recetas], eliminarTareas":
      console.log("Eliminar todas receta");
      return [];

    default:
      return state;
  }
  return newReceta;
};

export const ListaRecetas = () => {
  const [Recetastate, dispatch] = useReducer(recetaReducer, listaRecetas);

  const { receta, formState, OnInputchange } = useForm({ receta: "" });
  const agregarReceta = (event) => {
    event.preventDefault();
    //   type: "[Recetas], Agregar receta",
    //   payload: nuevaReceta,
    console.log(formState);
  };
  return (
    <>
      <form onSubmit={agregarReceta}>
        <div className="form-group">
          <label htmlFor="recetas">Ingresar nueva receta: </label>
          <input
            type="text"
            className="form-control"
            name="recetas"
            aria-describedby="emailHelp"
            placeholder="Ingresar recetas"
            value={receta}
            onChange={OnInputchange}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          Ingresar Receta
        </button>
      </form>
      <hr />
      <ul>
        {Recetastate.map((item) => {
          return <li key={item.id}>{item.nombre_receta}</li>;
        })}
      </ul>
    </>
  );
};
