import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Board from "../../assets/styles/Board";
import Icon from "../../assets/styles/Icon";

type TaskPropsType = {
  index: number;
  task: any;
  columnTitle: string;
};

const Task = ({ index, task, columnTitle }: TaskPropsType) => {
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    if (columnTitle === "Done" || columnTitle === "Concluido") {
      setIsCheck(true);
    }
  }, [task]);

  return (
    <>
      <Draggable draggableId={task.stringId} index={index}>
        {(provided) => (
          <Board.Item
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Board.Content>
              <Board.ItemFlex>
                <Board.Checkbox
                  onClick={() => setIsCheck(!isCheck)}
                  isChecked={isCheck}
                >
                  <Icon.Check />
                </Board.Checkbox>
                <Board.ItemTitle>
                  {task.title}
                  <span>
                    0 / 12
                  </span>
                </Board.ItemTitle>
              </Board.ItemFlex>
            </Board.Content>
          </Board.Item>
        )}
      </Draggable>
    </>
  );
};

export default Task;
