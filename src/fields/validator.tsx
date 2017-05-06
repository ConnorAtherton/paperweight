import * as React from 'react'
import{ Component } from 'react'

export interface ValidatorPropTypes {
  name: string
  label: string | React.Component<any, any>
  required?: boolean
}

export interface ValidatorHookProps {
  name: string
  storeRef: Function
  onBlur: Function
  onChange: Function
}

export interface ValidatorState {
  error: boolean
  errorMessage: string
  forceValidated: boolean
}

export default function HigherOrderComponent (
  WrappedComponent: React.ComponentClass<any> | React.StatelessComponent<any>
) : React.ComponentClass<any> {
  return class extends Component<ValidatorPropTypes, any> {
    private ref

    public static defaultProps: Partial<ValidatorPropTypes> = {
      required: true
    }

    protected storeRef (ref) {
      this.ref = ref
    }

    protected onBlur (e) {
      // TODO
    }

    protected onChange (e) {
      // TODO
    }

    public render () {
      return (
        <section className='c-paperweight-form-field'>
          <label htmlFor={this.props.name} className='c-paperweight-label'>
            {this.props.label}
            {this.props.required && <span>*</span>}
          </label>

          <WrappedComponent
            storeRef={this.storeRef.bind(this)}
            className='c-paperweight-input'
            name={this.props.name}
            onBlur={this.onBlur.bind(this)}
            onChange={this.onBlur.bind(this)} />
        </section>
      )
    }
  }
}
