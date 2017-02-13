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
  public componentDidMount() {
    let children = this.props.children

    console.log('Initial =>', children)

    while (children.length) {
      children.forEach(console.log)
      React.Children.map(children, x => console.log((x as any))

      children = children.props.children
    }
  }

  public render() {
    return (
      <form>
        {this.props.children}
      </form>
    )
  }
}

export default Form
