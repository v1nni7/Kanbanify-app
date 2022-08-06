import { Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { IoCheckmarkCircleSharp, IoAlertCircleSharp, IoCaretDown } from "react-icons/io5";

import './styles.scss';

const Register = () => {

  const [stepper, setStepper] = useState(0);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  // Alterar Any
  const genderSelectOption: any = useRef();

  console.log(selectedOption)

  // Alterar Any
  const handleRegister = (data: TypeInitialValues) => {
    console.log(data)
  }

  const optionList = ['Masculino', 'Feminino', 'Outros'];

  const toggleOptions = () => {
    setIsOptionOpen(!isOptionOpen);
  }

  interface TypeInitialValues {
    email: string,
    password: string,
    confirmPassword: string,
    fname: string,
    lname: string,
    username: string,
    gender: string,
    birthday: string,
  }

  const formInitialValues: TypeInitialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    fname: '',
    lname: '',
    username: '',
    gender: '',
    birthday: '',
  }

  return (
    <>
      <section className="register" onClick={toggleOptions}>
        <Formik
          enableReinitialize
          onSubmit={handleRegister}
          initialValues={formInitialValues}
        >
          {({ values, handleBlur, handleChange, handleSubmit }) => (
            <div className="stepper">
              <div className="stepper-content">
                <div className="step-horizontal">
                  {stepper > 0 ?
                    <IoCheckmarkCircleSharp className="step-icon" />
                    :
                    <IoAlertCircleSharp className="step-icon" />
                  }
                  <h4>Informações do usuário</h4>
                </div>
                <div className="step-connector"></div>
                <div className="step-horizontal">
                  {stepper > 1 ?
                    <IoCheckmarkCircleSharp className="step-icon" />
                    :
                    <IoAlertCircleSharp className="step-icon" />
                  }

                  <h4>Informações da conta</h4>
                </div>
                <div className="step-connector"></div>
                <div className="step-horizontal">
                  {stepper > 2 ?
                    <IoCheckmarkCircleSharp className="step-icon" />
                    :
                    <IoAlertCircleSharp className="step-icon" />
                  }

                  <h4>Confirmação do email</h4>
                </div>
              </div>
              {stepper === 0 ?
                <>
                  <Form className="form-horizontal form-horizontal-large">
                    <div className="flex form-flex flex-wrap">
                      <div className="form-group">
                        <input type="text" id="fname" className="form-control" value={values.fname} onChange={handleChange('fname')} />
                        <label htmlFor="fname" className={`form-label-anim ${values.fname ? 'focused' : 'unfocused'}`}>Nome</label>
                      </div>
                      <div className="form-group">
                        <input type="text" id="lname" className="form-control" value={values.lname} onChange={handleChange('lname')} />
                        <label htmlFor="lname" className={`form-label-anim ${values.lname ? 'focused' : 'unfocused'}`}>Sobrenome</label>
                      </div>
                      <div className="form-group">
                        {/* <input type="text" id="lname" className="form-control" value={values.lname} onChange={handleChange('lname')} /> */}
                        <button
                          type="button"
                          onClick={toggleOptions}
                          className="form-control-select-button"
                          aria-haspopup="listbox"
                          aria-expanded={isOptionOpen}
                        >
                          {selectedOption ?
                            selectedOption
                            :
                            'Gênero'
                          }
                          <IoCaretDown />
                        </button>
                        <ul
                          ref={genderSelectOption}
                          className={`form-control-select-options ${isOptionOpen ? 'show' : ''}`}
                          role="listbox"
                          tabIndex={-1}
                        >
                          {optionList.map((option, index) => (
                            <li
                              className="select-option"
                              key={index}
                              role="option"
                              tabIndex={0}
                              onClick={(e) => {
                                setSelectedOption(option);
                                setIsOptionOpen(false);
                              }}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                        {/* <label htmlFor="lname" className={`form-label-anim ${values.lname ? 'focused' : 'unfocused'}`}>Sobrenome</label> */}
                      </div>
                      <div className="form-group">
                        <input type="text" id="birthday" className="form-control" value={values.birthday} onChange={handleChange('birthday')} />
                        <label htmlFor="birthday" className={`form-label-anim ${values.birthday ? 'focused' : 'unfocused'}`}>Aniversário</label>
                      </div>
                    </div>
                    <div className="form-group flex justify-content-end">
                      <button type="submit" className="btn-next-step" /* onClick={() => setStepper(stepper + 1)} */>Próximo</button>
                    </div>
                  </Form>
                </>
                :
                <></>
              }

              {stepper === 1 ?
                <Form className="form-horizontal form-horizontal-large">
                  <div className="form-group">
                    <input type="text" className="form-control" />
                    <label htmlFor="email" className="form-label-anim">Email</label>
                  </div>
                  <div className="form-group flex justify-content-end">
                    <button type="button" className="btn-next-step" onClick={() => setStepper(stepper + 1)}>Próximo</button>
                  </div>
                </Form>
                :
                <></>
              }

              {stepper === 2 ?
                <Form className="form-horizontal form-horizontal-large">
                  <div className="form-group">
                    <input type="text" className="form-control" />
                    <label htmlFor="name" className="form-label-anim">Confirmação de email</label>
                  </div>
                </Form>
                :
                <></>
              }
            </div>
          )}
        </Formik>
      </section>
    </>
  )
}

export default Register;