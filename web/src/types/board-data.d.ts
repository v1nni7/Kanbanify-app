export interface Board {
  _id: string
  userId: 1
  name: string
  url: string
  background: string
  content: {
    tasks: {
      [key: string]: {
        id: string
        title: string
        description: string
        coverURL: string
        checklists: {
          id: string
          title: string
          items: {
            id: string
            title: string
            checked: boolean
          }[]
        }[]
      }
    }
    columns: {
      [key: string]: {
        id: string
        title: string
        taskIds: string[]
      }
    }
    columnOrder: string[]
  }
}
