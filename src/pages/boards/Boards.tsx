import { IoAddCircleOutline } from 'react-icons/io5';
import backgroundImage from '../../assets/images/backgrounds/codebackground.jpg';

import './styles.scss';

const Boards = () => {
  return (
    <>
      <section className="boards-section">
        <div className="container">
          <div className="boards flex flex-wrap">
            <div className="board">
              <div className="board-background background-new-board flex justify-content-center align-items-center">
                <h2>Criar novo quadro</h2>
              </div>
            </div>
            <div className="board">
              <div className="board-background">
                <img src={backgroundImage} alt="" />
              </div>
              <div className="board-background-gradient flex align-items-end">
                <h2>Meu primeiro quadro</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Boards;
