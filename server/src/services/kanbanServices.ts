import kanbanRepository from "@/repositories/kanbanRepository";
import { conflictError, unauthorizedError } from "@/utils/errorUtils";

async function createKanbanBoard(body: any, userId: number) {
  const boardNameAlreadyExists = await kanbanRepository.findBoardByName(
    body.name
  );

  if (boardNameAlreadyExists) {
    throw conflictError("Board name already exists");
  }

  const response = await kanbanRepository.createKanbanBoard(body, userId);

  return response;
}

async function getKanbanBoards(userId: number) {
  if (!userId) {
    throw unauthorizedError("asdsad");
  }

  const response = await kanbanRepository.getKanbanBoards(userId);

  return response;
}

export default { createKanbanBoard, getKanbanBoards };
