import { Form, Formik, FormikValues } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BiAddToQueue, BiImage, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import boardServices from "../services/boardServices";

const WorkspacePage = () => {
  const [boards, setBoards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const modal = useRef<HTMLDivElement>(null);
  const modalDialog = useRef<HTMLDivElement>(null);

  const initialValues = {
    name: "",
    background: "",
  };

  const loadingBoards = useCallback(async () => {
    try {
      const response = await boardServices.getBoards();

      console.log(response.data);
      if (response.status === 200 && response.data.length > 0) {
        setBoards(response.data);
        return;
      }

      toast.warning("Nenhum quadro encontrado");
    } catch (error: any) {
      if (error instanceof ValidationError) {
        toast.error(error.message);
        return;
      }

      toast.error(error.response.data);
    }
  }, []);

  const handleSubmit = async (data: FormikValues) => {
    try {
      console.log(data);
      const response = await boardServices.createBoard(data);

      if (response.status === 201) {
        console.log("Quadro criado com sucesso");
        setModalOpen(false);
        loadingBoards();
      }
    } catch (error: any) {
      if (error instanceof ValidationError) {
        toast.error(error.message);
        return;
      }

      toast.error(error.response.data);
    }
  };

  const handleModalClose = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (
        event.target !== modal.current &&
        event.target !== modalDialog.current
      ) {
        return;
      }

      setModalOpen(false);
    },
    [modalOpen]
  );

  useEffect(() => {
    loadingBoards();
  }, [loadingBoards]);

  return (
    <>
      <section className="workspace">
        <div className="container-fluid">
          <ul className="workspace-list">
            <li className="workspace-item" onClick={() => setModalOpen(true)}>
              <div className="workspace-item-content">
                <div className="workspace-item-background-create"></div>
                <h2 className="workspace-item-title">Criar quadro</h2>
              </div>
            </li>
            {boards.map((board: any, index: number) => (
              <li className="workspace-item" key={index}>
                <Link
                  to={`/board/${board.safeUrl}`}
                  className="workspace-item-content"
                >
                  <div className="workspace-item-background">
                    <div className="workspace-item-overlay"></div>
                    <img src={board.background} alt="" />
                  </div>
                  <h2 className="workspace-item-title">{board.name}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div
        className={`modal ${modalOpen ? "show" : "hidden"}`}
        ref={modal}
        onClick={handleModalClose}
      >
        <div className="modal-dialog" ref={modalDialog}>
          <div className="modal-content">
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
              {({ handleChange, isSubmitting, values }) => (
                <>
                  <Form>
                    <div className="modal-header">
                      <h5 className="modal-title">Criar quadro</h5>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setModalOpen(false)}
                      >
                        <BiX />
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-horizontal form-modal">
                        <div className="form-group form-flex">
                          <input
                            id="name"
                            type="text"
                            placeholder="Nome do quadro"
                            className="form-control"
                            value={values.name}
                            onChange={handleChange("name")}
                          />
                          <label htmlFor="name" className="form-label">
                            <BiAddToQueue />
                          </label>
                        </div>
                        <div className="form-group form-flex">
                          <input
                            id="background"
                            type="text"
                            placeholder="Imagem de fundo"
                            className="form-control"
                            value={values.background}
                            onChange={handleChange("background")}
                          />
                          <label htmlFor="background" className="form-label">
                            <BiImage />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setModalOpen(false)}
                      >
                        Cancelar
                      </button>
                      <button type="submit" className="btn-primary">
                        Salvar
                      </button>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspacePage;
