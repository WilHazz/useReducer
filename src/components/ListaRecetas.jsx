import { useReducer } from "react";
import { useForm } from "../Hooks/useForm";

const listaRecetas = [
  {
    id: new Date().getTime(),
    nombre_receta: "Pastas con pollo",
    bajaAzucar: "false",
  },
];

const nuevaReceta = {
  id: new Date().getTime(),
  nombre_receta: "Pita de pollo",
  bajaAzucar: "false",
};

const ediarReceta = {
  type: "[Recetas], ediarTarea",
  payload: nuevaReceta,
};
const borrarReceta = {
  type: "[Recetas], borrarReceta",
};
const borrarRecetas = {
  type: "[Recetas], borrarRecetas",
};

const recetaReducer = (newReceta = listaRecetas, action = {}) => {
  switch (action.type) {
    case "[Recetas], Agregar receta":
      return [...newReceta, action.payload];

    case "[Recetas], bajaAzucar":
      return newReceta.map((receta) => {
        if (receta.id === action.payload) {
          return {
            ...receta,
            bajaAzucar: !receta.bajaAzucar,
          };
        }
        return receta;
      });

    case "[Recetas], borrarReceta":
      return newReceta.filter((receta) => receta.id !== action.payload);
    case "[Recetas], borrarRecetas":
      return [];

    default:
      return newReceta;
  }
};

export const ListaRecetas = () => {
  const [Recetastate, dispatch] = useReducer(recetaReducer, listaRecetas);

  const { receta, formState, OnInputchange } = useForm({ receta: "" });
  const agregarReceta = (event) => {
    event.preventDefault();
    if (formState.receta == "") return;
    console.log(formState);
    const receta = {
      id: new Date().getTime(),
      nombre_receta: formState.receta,
      bajaAzucar: false,
    };
    const action = {
      type: "[Recetas], Agregar receta",
      payload: receta,
    };
    dispatch(action);
  };

  const bajaenAzucar = ({ id }) => {
    const action = {
      type: "[Recetas], bajaAzucar",
      payload: id,
    };
    dispatch(action);
  };

  const borrarReceta = ({ id }) => {
    const action = {
      type: "[Recetas], borrarReceta",
      payload: id,
    };
    dispatch(action);
  };

  const reset = () => {
    const action = {
      type: "[Recetas], borrarRecetas",
      payload: "",
    };
    dispatch(action);
  };

  return (
    <>
      <form onSubmit={agregarReceta}>
        <div className="form-group">
          <label htmlFor="receta">Ingresar nueva receta: </label>
          <input
            type="text"
            className="form-control"
            name="receta"
            // aria-describedby="emailHelp"
            placeholder="Ingresar recetas"
            value={receta}
            onChange={OnInputchange}
          />
        </div>
        <button type="submit" className="btn btn-warning">
          📑 Ingresar Receta
        </button>
        <button type="button" className="btn btn-primary" onClick={reset}>
          🔄 Reset
        </button>
      </form>
      <hr />
      <ul className="list-group">
        {Recetastate.map((item) => {
          return (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{item.nombre_receta}</span>
              <div>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={item.bajaAzucar}
                  onChange={() => bajaenAzucar(item)}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => borrarReceta(item)}
                >
                  🗑
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
