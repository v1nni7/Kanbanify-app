import { boardCollection } from "@/config/mongo";
import { ObjectId } from "mongodb";

export type Board = {
  _id?: ObjectId;
  url: string;
  name: string;
  userId: number;
  background: string;

  content: {
    tasks: {
      [key: string]: {
        id: string;
        title: string;
      };
    };
    columns: {
      [key: string]: {
        id: string;
        title: string;
        taskIds: string[];
      };
    };
    columnOrder: string[];
  };
};

function createBoard(board: Board) {
  boardCollection.insertOne(board);
}

function findBoardByUserId(userId: number) {
  return boardCollection.find({ userId }).toArray();
}

function findBoardByURL(boardURL: string) {
  return boardCollection.findOne({ url: boardURL });
}

function createColumnInBoard(newContent, boardURL: string) {
  return boardCollection.updateOne(
    {
      url: boardURL,
    },
    {
      $set: {
        content: newContent,
      },
    }
  );
}

function createTaskInColumn(newContent, boardURL: string) {
  return boardCollection.updateOne(
    {
      url: boardURL,
    },
    {
      $set: {
        content: newContent,
      },
    }
  );
}

function updateBoard(content, boardURL: string) {
  return boardCollection.updateOne(
    {
      url: boardURL,
    },
    {
      $set: {
        content,
      },
    }
  );
}

function updateColumnTitle(title: string, columnId: string, boardURL: string) {
  return boardCollection.updateOne(
    {
      url: boardURL,
    },
    {
      $set: {
        [`content.columns.${columnId}.title`]: title,
      },
    }
  );
}

function upsertTaskDescription(description: string, taskId: string, boardURL: string) {
  return boardCollection.updateOne(
    {
      url: boardURL,
    },
    {
      $set: {
        [`content.tasks.${taskId}.description`]: description,
      }
    },
    { upsert: true }
  )
}


function updateColumnOrder(newColumnOrder, boardURL: string) {
  return boardCollection.updateOne(
    { url: boardURL },
    { $set: { "content.columnOrder": newColumnOrder } }
  );
}

function updateTaskOrder({ columnId, taskIds }, boardURL: string) {
  return boardCollection.updateOne(
    { url: boardURL },
    { $set: { [`content.columns.${columnId}.taskIds`]: taskIds } }
  );
}

function updateTaskToNewColumn(
  { taskId, sourceColumnId, destinationColumnId, newTaskOrder },
  boardURL
) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $pull: {
        [`content.columns.${sourceColumnId}.taskIds`]: taskId,
      },
      $set: {
        [`content.columns.${destinationColumnId}.taskIds`]: newTaskOrder,
      },
    }
  );
}

export default {
  createBoard,
  findBoardByUserId,
  findBoardByURL,
  createColumnInBoard,
  createTaskInColumn,
  updateBoard,
  updateColumnTitle,
  updateTaskOrder,
  updateColumnOrder,
  updateTaskToNewColumn,
  upsertTaskDescription
};
