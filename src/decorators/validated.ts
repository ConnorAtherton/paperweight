const validatedDecorator = (target: any) => {
  target.__validated__ = true
}

export default validatedDecorator
