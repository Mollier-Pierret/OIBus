/**
 * @jest-environment jsdom
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { act, Simulate } from 'react-dom/test-utils'

import EngineSettings from './EngineSettings.jsx'

import activeConfig from '../../../tests/testConfig'

// ReacFlow does not seem to be working with jest.
// so we have to mock this component
jest.mock('../../../node_modules/react-flow-renderer/dist/ReactFlow.js', () => () => ('ReactFlow'))

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => (
  { useHistory: () => ({ push: mockHistoryPush }) }
))

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

React.useContext = jest.fn().mockReturnValue({ activeConfig })
describe('EngineSettings', () => {
  test('display EngineSettings page based on config', async () => {
    act(() => {
      ReactDOM.render(
        <EngineSettings />,
        container,
      )
    })
    expect(container).toMatchSnapshot()
  })

  test('check edit first application', () => {
    act(() => {
      ReactDOM.render(
        <EngineSettings />, container,
      )
    })
    Simulate.click(document.getElementById('dropdown-toggle'))
    Simulate.click(document.getElementById('icon-settings'))
    expect(mockHistoryPush).toBeCalledWith({ pathname: '/Engine/' })
    expect(container).toMatchSnapshot()
  })
})
