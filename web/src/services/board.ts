import { api } from './api'

export async function createBoard(body: any) {
  return await api.post('/boards', body)
}

export async function getAllBoards() {
  return await api.get('/boards')
}

export async function getBoard(boardId: string) {
  return await api.get(`/boards/${boardId}`)
}

export async function createColumn(title: any, boardURL: string) {
  return await api.post(`/boards/column/${boardURL}`, { title })
}

export async function createTask(
  title: string,
  boardURL: string,
  columnId: string,
) {
  return await api.post(
    `/boards/task/${boardURL}`,
    { title },
    { params: { columnId } },
  )
}

export async function updateBoard(content: any, boardURL: string) {
  return await api.put(`/boards/${boardURL}`, content)
}

type UpdateColumnTitleParams = {
  title: string
  columnId: string
}

export async function updateColumnTitle(
  body: UpdateColumnTitleParams,
  boardURL: string,
) {
  return await api.put(`/boards/column/${boardURL}`, body)
}

export async function uploadImage(body: any) {
  return await api.post('/upload', body)
}

export async function updateColumnOrder(
  newColumnOrder: string[],
  boardURL: string,
) {
  return await api.put(`/boards/columnOrder/${boardURL}`, newColumnOrder)
}

export async function updateTaskOrder(dataTaskOrder: any, boardURL: string) {
  return await api.put(`/boards/taskOrder/${boardURL}`, dataTaskOrder)
}

export async function updateTaskToNewColumn(
  updateTaskData: any,
  boardURL: string,
) {
  return await api.put(`/boards/task/column/${boardURL}`, updateTaskData)
}

export async function upsertTaskDescription(
  body: any,
  boardURL: string | null,
) {
  return await api.post(`/boards/task/description/${boardURL}`, body)
}
