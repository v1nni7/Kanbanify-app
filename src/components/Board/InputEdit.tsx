import { KeyboardEvent, useCallback, useContext } from "react";
import { BoardContext } from "../../hooks/context/BoardContext";
import { IColumn, ITask } from "../../interface/boardInterfaces";

interface IInputEditProps {
  defaultValue: string;
  object: IColumn | ITask;
  type: "column" | "task";
}

const InputEdit = ({ defaultValue, object, type }: IInputEditProps) => {
  const { board, setBoard } = useContext(BoardContext);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      event.currentTarget.blur();

      handleSubmit(object.id, event.currentTarget.value);
    },
    [object.id]
  );

  const handleSubmit = useCallback((objectId: string, title: string) => {
    let newState = {};

    if (type === "column") {
      newState = {
        ...board,
        columns: {
          ...board.columns,
          [objectId]: {
            ...board.columns[objectId],
            title,
          },
        },
      };
    }

    if (type === "task") {
      newState = {
        ...board,
        tasks: {
          ...board.tasks,
          [objectId]: {
            ...board.tasks[objectId],
            title,
          },
        },
      };
    }

    setBoard(newState);
  }, [board]);

  return (
    <>
      <input
        type="text"
        className="column-title-editable"
        defaultValue={defaultValue}
        onKeyUp={handleKeyPress}
        onBlur={(e) => handleSubmit(object.id, e.target.value)}
      />
    </>
  );
};

export default InputEdit;
