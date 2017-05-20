import * as React from 'react'
import * as _set from 'lodash.set'

export interface FormProps extends React.HTMLProps<HTMLFormElement> {
  onSubmit?: (values: Object) => void,
  onValueChange?: (values: Object, validations: Object) => void,
  onValidSubmit?: (value: Object) => void,
  onInvalidSubmit?: (value: Object) => void
}

export interface FormState {
  hasBeenSubmitted?: boolean,
  isValid?: boolean,
  values?: Object,
  validations?: Object,
  fieldNames?: string[]
}

declare type oneOrMoreReactElements = React.ReactElement<any> | React.ReactElement<any>[] | string | null

class Form extends React.Component<FormProps, FormState> {
  public state: Partial<FormState> = {
    hasBeenSubmitted: false,
    isValid: false,
    values: {},
    validations: {}
  }

  private hasInitialFieldValues: boolean = false

  private onValidFieldChange = (e) => {
    const values = this.state.values
    const validations = this.state.validations

    /**
     * We keep validations as a flat data structure because we only care about whether each key
     * is valid, and it is far easier to do it with one loop of object values than traversing
     * a nested structure.
     */
    _set(values, e.target.name, e.target.value)
    validations[e.target.name] = true

    this.setState(
      { values, validations },
      () => this.props.onValueChange(this.state.values, this.state.validations)
    )
  }

  private onInvalidFieldChange = (e) => {
    const values = this.state.values
    const validations = this.state.validations

    _set(values, e.target.name, e.target.value)
    validations[e.target.name] = false

    this.setState(
      { values, validations },
      () => this.props.onValueChange(this.state.values, this.state.validations)
    )
  }

  private renderModifiedChildren () {
    const usedFieldNames = new Set()

    const traverse = (children) => {
      if (!children) return null
      if (children instanceof String) return children

      return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return child
        }

        if (((child as React.ReactElement<any>).type as any).__validated__) {
          const fieldName = (child as React.ReactElement<any>).props.name as string

          if (usedFieldNames.has(fieldName)) {
            console.warn(`Seen multiple fields with the same name prop: ${fieldName}`)
          }

          usedFieldNames.add(fieldName)

          return React.cloneElement(child as React.ReactElement<any>, {
            onValidChange: this.onValidFieldChange,
            onInvalidChange: this.onInvalidFieldChange
          })
        }

        return React.cloneElement(child as React.ReactElement<any>, {
          children: traverse((child.props as any).children)
        })
      })
    }

    return traverse(this.props.children)
  }

  private onSubmit (e: React.FormEvent<any>) {
    e.preventDefault()

    console.log('=> Submit form')
  }

  public render () {
    return (
      <form onSubmit={this.onSubmit}>
        {this.renderModifiedChildren()}

        <button type='submit'>
          Submit
        </button>
      </form>
    )
  }
}

export default Form
