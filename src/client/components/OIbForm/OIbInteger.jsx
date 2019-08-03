import React from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormFeedback, FormText, Label, Input } from 'reactstrap'

const OIbInteger = ({ label, help, min, max, value, id, onChange }) => {
  const [currentValue, setCurrentValue] = React.useState(value)
  const isValid = (val) => ((max ? val <= max : true) && ((min ? val >= min : true)))

  const handleChange = (event) => {
    const { target } = event
    console.info('set json avec la nouvelle valeur', target.name, target.value)
    setCurrentValue(value)
    if (isValid(value)) onChange(value)
  }

  return (
    <FormGroup>
      <Label for={id}>{label}</Label>
      <Input
        type="integer"
        min={min}
        max={max}
        id={id}
        name={id}
        invalid={!isValid(currentValue)}
        value={value}
        onChange={handleChange}
      />
      <FormFeedback>Invalid Entry</FormFeedback>
      <FormText>{help}</FormText>
    </FormGroup>
  )
}
OIbInteger.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
}
OIbInteger.defaultProps = {
  min: null,
  max: null,
}


export default OIbInteger
