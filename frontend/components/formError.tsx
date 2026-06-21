interface IFormErrorProps {
  errors?: string[]
}

function FormError({ errors }: Readonly<IFormErrorProps>) {
  if (!errors) return null

  return errors.map((error, index) => (
    <p key={`${error}-${index}`} className="text-red-500 text-xs font-semibold">
      {error}
    </p>
  ))
}

export default FormError
