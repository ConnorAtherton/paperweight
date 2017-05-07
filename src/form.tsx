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

class Form extends React.Component<FormProps, FormState> {
  public componentWillMount() {
    let children: React.ReactChild[] = React.Children.toArray(this.props.children)

    console.log('=> Initial children', children)

    const traverse = (children): void => {
      if (!children) return

      React.Children.forEach(children, child => {
        console.log(child)
      })
    }

    traverse(this.props.children)
  }

  private onSubmit (e: React.FormEvent<any>) {
    e.preventDefault()

    console.log('=> Submit form')
  }

  public render () {
    return (
      <form onSubmit={this.onSubmit}>
        {this.props.children}

        <button type='submit'>
          Submit
        </button>
      </form>
    )
  }
}

export default Form
