import { useEffect } from 'react';
import { IoEllipsisHorizontalSharp, IoPencil, IoCheckboxOutline } from 'react-icons/io5';
import './styles.scss';

const BoardPage = () => {

  const data = [
    {
      boardName: 'Em Progresso',
      boardItems: [
        {
          boardItemName: 'Área de trabalho',
          boardTotalItems: 10,
          boardCompletedItems: 2,
        },
        {
          boardItemName: 'Página de Login',
          boardTotalItems: 6,
          boardCompletedItems: 4,
        }
      ]
    },

    {
      boardName: 'Concluído',
      boardItems: [
        {
          boardItemName: 'Área de trabalho',
          boardTotalItems: 10,
          boardCompletedItems: 2,
        },
        {
          boardItemName: 'Página de Login',
          boardTotalItems: 6,
          boardCompletedItems: 4,
        }
      ]
    }
  ]

  const handleChangeTextArea = (indexBoard: number, indexBoardItem: number, textAreaValue: string) => {
    if(textAreaValue.length === 0){
      return
    }
    
    // Gambiarra? Não sei estou testando
    data[indexBoard].boardItems[indexBoardItem].boardItemName = textAreaValue;
  }

  useEffect(() => {
  
  }, [])

  return (
    <>
      <div className="workspace">
        {data.map((board, indexBoard) => (
          <div className="board" key={indexBoard}>
            <div className="board-name">
              {board.boardName}

              <IoEllipsisHorizontalSharp className="board-icon" />
            </div>
            {board.boardItems.map((boardItem, indexBoardItem) => (
              <div className="board-item" key={indexBoardItem}>
                <div className="board-item-content">
                  <div className="board-item-name">
                    <textarea className="board-item-name-editable" onChange={(e) => handleChangeTextArea(indexBoard, indexBoardItem, e.target.value)} defaultValue={boardItem.boardItemName}></textarea>

                    <IoPencil className="board-icon" />
                  </div>
                  <div className="board-item-checked">
                    <IoCheckboxOutline className="board-icon-checked" />
                    <div className="board-number-checked">
                      {boardItem.boardCompletedItems}/{boardItem.boardTotalItems}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default BoardPage;