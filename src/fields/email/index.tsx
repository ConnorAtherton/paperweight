import * as React from 'react'
import { Component } from 'react'
import validatorComponent from '../validator'

interface EmailFieldState {
  currentVal: string
  shadowVal: string
}

class EmailFieldClass extends React.Component<any, EmailFieldState> {
  private static autoCompleteChars = new Set([
    9,
    13,
    39,
    32
  ])

  private static autoCompleteDomains = new Set([
    'google.com'
  ])

  public render () {
    const {
      storeRef,
      ...rest
    } = this.props

    return (
      <input ref={c => storeRef(c)} {...rest} />
    )
  }
}

export const EmailField = validatorComponent(EmailFieldClass)
