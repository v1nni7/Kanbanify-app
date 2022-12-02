import { Field, Form, Formik, FormikValues } from "formik";
import { useContext } from "react";
import { BiX } from "react-icons/bi";
import { BoardContext } from "../../hooks/context/BoardContext";
import newTask from "../../data/newTask.json";

interface IInputCreateProps {
  type: "column" | "task";
  columnId: string;
}

const InputCreate = ({ type, columnId }: IInputCreateProps) => {
  const { board, setBoard } = useContext(BoardContext);

  const handleSubmit = (values: FormikValues) => {
    try {
      let newState = { ...board };

      if (type === "column") {
        const newColumn = {
          id: Math.random().toString(36).substring(2, 9),
          title: values.title,
          taskIds: [],
        };

        newState.columnOrder.push(newColumn.id);
        newState.columns[newColumn.id] = newColumn;
      }

      if (type === "task") {
        const createdTask = {
          ...newTask,
          id: Math.random().toString(36).substring(2, 9),
          title: values.title,
        };

        newState.tasks[createdTask.id] = createdTask;
        newState.columns[columnId].taskIds.push(createdTask.id);
      }

      setBoard(newState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={type === "column" ? "column" : "task"}>
        <Formik
          enableReinitialize
          onSubmit={handleSubmit}
          initialValues={{ title: "" }}
        >
          {({ handleChange, values, resetForm }) => (
            <Form
              className={`${values.title ? "show" : "hidden close-anim"} ${
                type === "column"
                  ? "column-container container-flex container-sm"
                  : "task-container"
              }`}
            >
              <Field
                autoComplete="off"
                className="column-input-create"
                onChange={handleChange("title")}
                value={values.title}
                id={type === "column" ? "new-column" : "new-task"}
                placeholder={
                  type === "column"
                    ? "Adicionar nova coluna"
                    : "Adicionar nova tarefa"
                }
              />
              <div className="form-actions">
                <button type="submit" className="btn-create">
                  Adicionar coluna
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => resetForm()}
                >
                  <BiX />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default InputCreate;
