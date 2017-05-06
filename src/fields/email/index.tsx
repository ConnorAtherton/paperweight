import * as React from 'react'
import { Component } from 'react'
import validatorComponent from '../validator'
import { TextField } from '../text'

export interface EmailFieldState {
  currentVal: string
  shadowVal: string
}

export class EmailFieldClass extends React.Component<any, EmailFieldState> {
  public static displayName = 'Paperweight.EmailField'

  public state: EmailFieldState = {
    currentVal: '',
    shadowVal: ''
  }

  private static autoCompleteChars = new Set([
    9,
    13,
    39,
    32
  ])

  private static autoCompleteDomains = new Set([
    'google.com'
  ])

  protected handleKeyUp = (e: React.KeyboardEvent<any>) => {
  }

  private suggestCompletion = (e) => {
  }

  private wrapSetState = (fn) => e => this.setState({ currentVal: e.target.value }, () => fn(e))

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
          {...this.props}
          value={this.state.currentVal}
          onValidChange={this.wrapSetState(this.suggestCompletion)}
          onInvalidChange={this.wrapSetState(this.props.onInvalidChange)} />
      </section>
    )
  }
}

export const EmailField = EmailFieldClass
