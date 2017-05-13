import * as React from 'react'
import { Component } from 'react'
import validatorComponent from '../validator'
import { TextField } from '../text'
import validated from '../../decorators/validated'

export interface EmailFieldState {
  currentVal: string
  shadowVal: string
}

@validated
export class EmailFieldClass extends React.Component<any, EmailFieldState> {
  public static displayName = 'Paperweight.EmailField'

  public state: EmailFieldState = {
    currentVal: '',
    shadowVal: ''
  }

  private static autoCompleteChars = new Set([ 9, 13, 39, 32 ])

  private static autoCompleteDomains = new Set([
    'google.com'
  ])

  protected handleKeyUp = (e: React.KeyboardEvent<any>) => {
    // TODO
  }

  private suggestCompletion = (e) => {
    // TODO
    this.props.onValidChange(e)
  }

  private wrapSetState = (fn) => e => {
    // We want to keep the event around so the `Form` component can do things with it later
    e.persist()
    this.setState({ currentVal: e.target.value }, () => fn(e))
  }

  public render () {
    return (
      <section>
        <input
          value={this.state.shadowVal}
          disabled
          readOnly
          autoComplete='off' />

        <TextField
          label='Email'
          name='email'
          validators={[
            {
              func: val => val.length < 3,
              message: 'Text must be less than 10 chars'
            }
          ]}
          {...this.props}
          value={this.state.currentVal}
          onValidChange={this.wrapSetState(this.suggestCompletion)}
          onInvalidChange={this.wrapSetState(this.props.onInvalidChange)} />
      </section>
    )
  }
}

export const EmailField = EmailFieldClass
