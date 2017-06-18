import * as React from 'react'
import { Component } from 'react'
import validatorComponent from '../validator'
import { TextField } from '../text'
import validated from '../../decorators/validated'

export interface EmailFieldState {
  currentVal?: string
  shadowVal?: string
}

export interface EmailFieldProps {
  autoCompleteDomains?: string[],
  onValidChange?: Function,
  onInvalidChange?: Function
}

interface HTMLValidatorElement extends HTMLElement {
  value: string
}

@validated
export class EmailFieldClass extends React.Component<any, EmailFieldState> {
  public static displayName = 'Paperweight.EmailField'

  private static defaultProps = {
    autoCompleteDomains: []
  }

  public state: EmailFieldState = {
    currentVal: '',
    shadowVal: ''
  }

  private static autoCompleteChars = new Set([ 9, 13, 39, 32 ])

  private static autoCompleteDomains = new Set([
    'google.com'
  ])

  private get autoCompleteDomains (): Set<string> {
    return new Set([
      ...EmailField.autoCompleteDomains,
      ...this.props.autoCompleteDomains
    ])
  }

  private suggestCompletion = (e): void => {
    let [before, after] = e.target.value.split('@')
    let matchedDomain = null

    console.log('=> suggestion completion now 1', before, after)

    // Means we have reached the host portion of the email
    if (after) {
      after = after.toLowerCase()

      console.log('=> suggestion completion now 2')

      for (const domain of this.autoCompleteDomains) {
        if (after === domain.substr(0, after.length)) {
          matchedDomain = domain
          break
        }
      }
    }

    this.setState({
      shadowVal: matchedDomain ? `${before}@${matchedDomain}` : ''
    })

    // TODO
    this.props.onValidChange(e)
  }

  private wrapSetState = (fn) => e => {
    // We want to keep the event around so the `Form` component can do things with it later
    e.persist()
    this.setState({ currentVal: e.target.value }, () => fn(e))
  }

  private componentDidMount () {
    //
    // TODO This should return if our input is not focused
    // TODO Remove this listener when the component unmounts
    //
    document.addEventListener('keydown', (e) => {
      if (this.state.shadowVal && EmailField.autoCompleteChars.has(e.keyCode)) {
        const clonedElement = (e.target as HTMLElement).cloneNode(true)

        Object.defineProperty(e, 'target', {
          value: clonedElement
        })

        // Need to do this to keep ts happy...
        Object.defineProperty(clonedElement as HTMLValidatorElement, 'value', {
          value: this.state.shadowVal
        })

        this.setState({
          currentVal: this.state.shadowVal,
          shadowVal: ''
        })

        this.props.onValidChange(e)
      }
    }, false)
  }

  public render () {
    const {
      // Do not pass thjis down
      autoCompleteDomains,

      ...allowedProps
    } = this.props

    return (
      <section className='u-pos-relative c-paperweight-email-input-container'>
        <input
          value={this.state.shadowVal}
          className='c-paperweight-input c-paperweight-email-input-shadow'
          disabled
          readOnly
          autoComplete='off' />

        <TextField
          label='Email'
          name='email'
          className='c-paperweight-email-input-focus'
          {...allowedProps}
          value={this.state.currentVal}
          onValidChange={this.wrapSetState(this.suggestCompletion)}
          onInvalidChange={this.wrapSetState(this.props.onInvalidChange)} />
      </section>
    )
  }
}

export const EmailField = EmailFieldClass
