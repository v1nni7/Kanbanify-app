import { useContext, useState } from "react";
import Column from "../components/Board/Column";
import { IBoard, IColumn, ITask } from "../interface/boardInterfaces";
import DragDropComponent from "../components/DragDropContext";
import useStorage from "../hooks/useStorage";
import data from "../assets/data/data.json";
import {
  BoardContext,
  BoardContextProvider,
} from "../hooks/context/BoardContext";
import Task from "../components/Board/Task";
import InputCreate from "../components/Board/InputCreate";

interface IFunctionProps {
  index: number;
  tasks: ITask[];
  column: IColumn;
}

interface ITasksProps {
  task: ITask;
  index: number;
}

const Test = () => {
  return (
    <>
      <BoardContextProvider>
        <div className="board-screen-wrapper">
          <DragDropComponent>
            {({ column, tasks, index }: IFunctionProps) => (
              <Column
                key={column.id}
                tasks={tasks}
                column={column}
                index={index}
              >
                {({ task, index }: ITasksProps) => (
                  <Task key={task.id} task={task} index={index} />
                )}
              </Column>
            )}
          </DragDropComponent>
        </div>
      </BoardContextProvider>
    </>
  );
};

export default Test;
