import * as React from 'react'
import validatorComponent, { ValidatorHookProps } from './validator'

class TextFieldClass extends React.Component<any, any> {
  public static displayName = 'Paperweight.TextField'

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

export const TextField = validatorComponent(TextFieldClass)
