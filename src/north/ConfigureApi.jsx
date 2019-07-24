import React from 'react'
import Form from 'react-jsonschema-form-bs4'
import { withRouter } from 'react-router-dom'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'
import apis from '../client/services/apis'
import Modal from '../client/components/Modal.jsx'
import uiSchema from './uiSchema.jsx'

const ConfigureApi = ({ match, location }) => {
  const [configJson, setConfigJson] = React.useState()
  const [configSchema, setConfigSchema] = React.useState()

  /**
   * Sets the configuration JSON
   * @param {Object} formData Data of the form
   * @returns {void}
   */
  const updateForm = (formData) => {
    setConfigJson(formData)
  }

  /**
   * Acquire the schema and set the configuration JSON
   * @returns {void}
   */
  React.useEffect(() => {
    const { api } = match.params
    const { formData } = location

    apis.getNorthApiSchema(api).then((schema) => {
      setConfigSchema(schema)
      updateForm(formData)
    })
  }, [])

  /**
   * Handles the form's submittion
   * @param {*} param0 Object containing formData field
   * @returns {void}
   */
  const handleSubmit = ({ formData }) => {
    const { applicationId } = formData
    apis.updateNorth(applicationId, formData)
  }

  /**
   * Handles the form's change
   * @param {Object} form The data of the form
   * @returns {void}
   */
  const handleChange = (form) => {
    const { formData } = form

    updateForm(formData)
    // submit change immediately on change
    handleSubmit(form)
  }

  /**
   * Shows the modal to delete application
   * @returns {void}
   */
  const handleDelete = async () => {
    const { applicationId } = configJson
    if (applicationId === '') return
    try {
      await apis.deleteNorth(applicationId)
      // TODO: Show loader and redirect to main screen
    } catch (error) {
      console.error(error)
    }
  }

  const log = (type) => console.info.bind(console, type)

  return (
    <>
      {configJson && configSchema && (
        <>
          <Form
            formData={configJson}
            liveValidate
            showErrorList={false}
            schema={configSchema}
            uiSchema={uiSchema(configJson.api)}
            autocomplete="on"
            onChange={handleChange}
            onError={log('errors')}
          >
            <></>
          </Form>
          <Modal show={false} title="Delete application" body="Are you sure you want to delete this application?">
            {(config) => (
              <Button color="danger" onClick={config(handleDelete)}>
                Delete
              </Button>
            )}
          </Modal>
        </>
      )}
    </>
  )
}

ConfigureApi.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
export default withRouter(ConfigureApi)
