import * as React from "react";

export interface FormProps extends React.HTMLProps<HTMLFormElement> {
  onSubmit?: (values: Object) => void,
  onValidSubmit?: (value: Object) => void,
  onInvalidSubmit?: (value: Object) => void
}

export interface FormState {
  hasBeenSubmitted: boolean,
  fields: React.ReactNode[],
  values: {},
  validations: {}
}

declare type oneOrMoreReactElements = React.ReactElement<any> | React.ReactElement<any>[] | string | null

class Form extends React.Component<FormProps, FormState> {
  private onValidFieldChange = (e) => {
    console.log('=> Valid field at form level:', e.target.name)
  }

  private onInvalidFieldChange = (e) => {
    console.log('=> Invalid field at form level:', e.target.name)
  }

  private renderModifiedChildren () {
    const traverse = (children) => {
      if (!children) return null
      if (children instanceof String) return children

      return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return child
        }

        if (((child as React.ReactElement<any>).type as any).__validated__) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onValidChange: this.onValidFieldChange,
            onInvalidChange: this.onInvalidFieldChange
          })
        }

        // HACK
        // console.log((child as React.ReactElement<any>).type)
        // console.log(((child as React.ReactElement<any>).type as any).__validated__)

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
