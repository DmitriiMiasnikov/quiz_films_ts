import React from 'react';
import classnames from 'classnames';
import styles from './Auth.module.scss';
import { Field, Form } from 'react-final-form';

type Props = {
  authorizationHandler: (data: any) => void,
  showRegistrationHandler: () => void,
  validate: any,
  inputs: {name: string, text: string}[],
  isWrongAuthorization: boolean
}

export const AuthDom = (props: Props) => {
  return (
    <div className={styles.wrapper}>
    <Form
      onSubmit={props.authorizationHandler} validate={props.validate}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={handleSubmit}>
          {
            props.inputs.map((el, i) => {
              return (
                <div className={classnames(styles.input)} key={i}>
                  <Field name={el.name}>
                    {({ input, meta }) => (
                      <div>
                        <input {...input} type={'text'} placeholder={el.text} />
                        {meta.error && meta.touched && <div className={styles.error}>{meta.error}</div>}
                      </div>
                    )}
                  </Field>
                </div>
              )
            })
          }
          {
            props.isWrongAuthorization && (
              <div className={classnames(styles.wrongAuth)}>
                неверное имя или пароль
              </div>
            )
          }
          <div className={classnames(styles.buttons)}>
            <button type='submit' disabled={submitting} className={styles.button}>
              <div className={styles.text}>
                вход
                  </div>
            </button>
            <div className={styles.button} onClick={() => props.showRegistrationHandler()}>
              <div className={styles.text}>
                регистрация
                    </div>
            </div>
          </div>
        </form>
      )}
    />
  </div>
  )
}