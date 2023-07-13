import { api } from './api'

export async function createBoard(body: any) {
  return await api.post('/boards', body)
}

export async function getBoards() {
  return await api.get('/boards')
}

export async function getBoardByURL(boardId: string) {
  return await api.get(`/boards/${boardId}`)
}

export async function uploadImage(body: any) {
  return await api.post('/upload', body)
}

export async function updateTaskOrder(dataTaskOrder: any, boardURL: string) {
  return await api.put(`/tasks/order/${boardURL}`, dataTaskOrder)
}

export async function updateTaskToNewColumn(
  updateTaskData: any,
  boardURL: string,
) {
  return await api.put(`/tasks/column/${boardURL}`, updateTaskData)
}

export async function upsertTaskDescription(
  body: any,
  boardURL: string | null,
) {
  return await api.post(`/tasks/description/${boardURL}`, body)
}

export async function upsertTaskImageURL(body: any, boardURL: string) {
  return await api.post(`/tasks/image/${boardURL}`, body)
}

export async function updateTaskTitle(body: any, boardURL: string) {
  return await api.put(`/tasks/title/${boardURL}`, body)
}

export async function createColumn(title: any, boardURL: string) {
  return await api.post(`/columns/${boardURL}`, { title })
}

export async function updateColumnTitle(body: any, boardURL: string | null) {
  return await api.put(`/columns/${boardURL}`, body)
}

export async function updateColumnOrder(
  columnOrder: string[],
  boardURL: string,
) {
  return await api.put(`/columns/order/${boardURL}`, columnOrder)
}

export async function createTask(
  title: string,
  boardURL: string,
  columnId: string,
) {
  return await api.post(`/tasks/${boardURL}`, { title, columnId })
}

export async function createFeedback(body: any) {
  return await api.post('/feedback', body)
}
