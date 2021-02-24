import React, { useRef, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import styles from './Registration.module.scss';
import classnames from 'classnames';
import close from './../../assets/images/close.svg';

type Props = {
  registrationHandler: (data: { name: string, password: string, email: string }) => void,
  inputs: { name: string, text: string }[],
  closeRegistration: () => void,
  errorsRegistration: string[] | null
}

export const RegistrationDom = (props: Props) => {
  return (
    <div className={classnames(styles.wrapper, styles.show)}>
      <div className={styles.registrationBlock}>
        <div onClick={() => props.closeRegistration()} className={styles.close}>
          <img src={close} alt='' />
        </div>
        <div className={styles.title}>
          Регистрация
        </div>
        <Form
          onSubmit={props.registrationHandler}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              {
                props.inputs.map((el, i) => {
                  return (
                    <div className={styles.line} key={i}>
                      <Field name={el.name}>
                        {({ input, meta }) => (
                          <div>
                            <label>*</label>
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
                props.errorsRegistration && Boolean(props.errorsRegistration.length) &&
                <div className={styles.errorsWrap}>
                  {
                    props.errorsRegistration.map((el: string, i: number) => {
                      return <div className={styles.line} key={i}>{el}</div>
                    })
                  }
                </div>
              }
              <div className={classnames(styles.line, styles.buttons)}>
                <button type='submit' disabled={submitting} className={styles.submit}>зарегистрировать</button>
                <button onClick={() => props.closeRegistration()} className={styles.closeButton}>Отмена</button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )
}