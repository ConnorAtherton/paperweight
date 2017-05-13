import * as React from 'react'
import { Component } from 'react'

export interface Validator {
  func: (value: string | Object) => boolean
  message: string
  onChange?: boolean
  onBlur?: boolean
}

export type Validators = Array<Validator>

export interface ValidatorPropTypes {
  name: string
  label: string | React.Component<any, any>
  onValidChange: (e) => void
  onInvalidChange?: (e) => void
  validators?: Validators
  required?: boolean
  onBlur?: (e) => void
  onChange?: (e) => void
}

export interface ValidatorHookProps {
  name: string
  storeRef: (ref: HTMLElement) => void
  onBlur: (event: React.FormEvent<HTMLElement>) => void
  onChange: (event: React.FormEvent<HTMLElement>) => void
}

export interface ValidatorState {
  error: boolean
  errorMessage: string
  forceValidated: boolean
}

export default function HigherOrderComponent (
  WrappedComponent: React.ReactType
) : React.ComponentClass<any> {
  return class extends Component<ValidatorPropTypes, ValidatorState> {
    /**
     * NOTE: Set a value on each node...
     *
     * We use this inside the `Form` component when it initially traverses all child noes to know
     * whether the current component we are looking at should automatically be bound to the form
     * state.
     */
    public static __validated__: boolean = true

    private ref: HTMLElement

    public state = {
      error: false,
      errorMessage: '',
      forceValidated: false
    }

    public static defaultProps: Partial<ValidatorPropTypes> = {
      required: true,
      validators: []
    }

    protected storeRef = (ref: HTMLElement) => {
      this.ref = ref
    }

    private validateWith (e: React.ChangeEvent<any>, validators: Validators): void {
      // TODO: scrub the value?

      const invalidValidator = validators.find(validator => validator.func(e.target.value) === false)

      if (invalidValidator) {
        this.setState({
          error: true,
          errorMessage: invalidValidator.message
        })

        this.props.onInvalidChange(e)
      } else {
        this.setState({
          error: false,
          errorMessage: ''
        })

        this.props.onValidChange(e)
      }
    }

    get onBlurValidators () {
      return this.props.validators.filter(validator => !(validator.onBlur === false))
    }

    get onChangeValidators () {
      return this.props.validators.filter(validator => !(validator.onChange === false))
    }

    protected onBlur (e: React.ChangeEvent<any>) {
      this.validateWith(e, this.onBlurValidators)
      this.props.onBlur && this.props.onBlur(e)
    }

    protected onChange (e: React.ChangeEvent<any>) {
      this.validateWith(e, this.onChangeValidators)
      this.props.onChange && this.props.onChange(e)
    }

    public render () {
      return (
        <section className='c-paperweight-form-field'>
          <label htmlFor={this.props.name} className='c-paperweight-label'>
            {this.props.label}
            {this.props.required && <span>*</span>}
          </label>

          <WrappedComponent
            storeRef={this.storeRef}
            className={`c-paperweight-input ${this.state.error ? 'is-error' : ''}`}
            name={this.props.name}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onBlur.bind(this)} />

          {this.state.error && (
            <span className='c-paperweight-input-error'>
              {this.state.errorMessage}
            </span>
          )}
        </section>
      )
    }
  }
}
