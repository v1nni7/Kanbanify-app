import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useCallback, useEffect, useRef, useState } from "react";
import { IoCheckmarkCircleSharp, IoAlertCircleSharp, IoCaretDown } from "react-icons/io5";

import './styles.scss';

const Register = () => {

  const [stepper, setStepper] = useState(0);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const nextStepper = useCallback(() => {
    // Fazendo a verificação dos dados antes de prosseguir
    try {

    } catch (error) {

    }
  }, [selectedOption, stepper]);

  const handleRegister = useCallback(async (data: TypeInitialValues) => {
    // Medida provisória
    data.gender = selectedOption
    try {
      const userInformation = Yup.object().shape({
        birthday: Yup.string().required('Informe sua data de aniversário'),
        gender: Yup.string().required('Informe seu gênero'),
        lname: Yup.string().required('Informe seu sobrenome'),
        fname: Yup.string().required('Informe seu nome'),
      });
      await userInformation.validate(data);

      if (stepper === 1) {
        const accountInformation = Yup.object().shape({
          username: Yup.string().required('Informe um nome de usuário'),
          email: Yup.string().email('Insira um email válido').required('Informe seu email'),
          password: Yup.string().min(8, 'Insira pelo menos 8 caracteres').required('Informe uma senha'),
          confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais').required('Informe a confirmação de senha'),
        });

        await accountInformation.validate(data)

        console.log('Requisição enviada para a API')
      }

      setStepper(stepper + 1)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error)
      }
    }


  }, [selectedOption, stepper])

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
      <section className="register">
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
                        <label htmlFor="fname" className={`form-label-anim ${values.fname ? 'focused' : 'unfocused'} `}>Nome</label>
                      </div>
                      <div className="form-group">
                        <input type="text" id="lname" className="form-control" value={values.lname} onChange={handleChange('lname')} />
                        <label htmlFor="lname" className={`form-label-anim ${values.lname ? 'focused' : 'unfocused'} `}>Sobrenome</label>
                      </div>
                      <div className="form-group">
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
                          className={`form-control-select-options ${isOptionOpen ? 'show' : ''} `}
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
                                setSelectedOption(option)
                                setIsOptionOpen(false);
                              }}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="form-group">
                        <input type="text" id="birthday" className="form-control" value={values.birthday} onChange={handleChange('birthday')} />
                        <label htmlFor="birthday" className={`form-label-anim ${values.birthday ? 'focused' : 'unfocused'} `}>Aniversário</label>
                      </div>
                    </div>
                    <div className="form-group flex justify-content-end">
                      <button type="submit" className="btn-next-step" /* onClick={nextStepper} */>Próximo</button>
                    </div>
                  </Form>
                </>
                :
                <></>
              }

              {stepper === 1 ?
                <Form className="form-horizontal form-horizontal-large">
                  <div className="flex form-flex flex-wrap">
                    <div className="form-group">
                      <input type="text" id="email" className="form-control" value={values.email} autoComplete="email" onChange={handleChange('email')} />
                      <label htmlFor="email" className={`form-label-anim ${values.email ? 'focused' : 'unfocused'} `}>Email</label>
                    </div>
                    <div className="form-group">
                      <input type="text" id="username" className="form-control" value={values.username} onChange={handleChange('username')} />
                      <label htmlFor="username" className={`form-label-anim ${values.username ? 'focused' : 'unfocused'} `}>Usuário</label>
                    </div>
                    <div className="form-group">
                      <input type="password" id="password" className="form-control" autoComplete="current-password" value={values.password} onChange={handleChange('password')} />
                      <label htmlFor="password" className={`form-label-anim ${values.password ? 'focused' : 'unfocused'} `}>Senha</label>
                    </div>
                    <div className="form-group">
                      <input type="password" id="confirmPassword" className="form-control" autoComplete="current-password" value={values.confirmPassword} onChange={handleChange('confirmPassword')} />
                      <label htmlFor="confirmPassword" className={`form-label-anim ${values.confirmPassword ? 'focused' : 'unfocused'} `}>Confirmação de senha</label>
                    </div>
                  </div>
                  <div className="form-group flex justify-content-between">
                    <button type="button" className="btn-next-step" onClick={() => setStepper(stepper - 1)}>Anterior</button>
                    <button type="submit" className="btn-next-step">Enviar</button>
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