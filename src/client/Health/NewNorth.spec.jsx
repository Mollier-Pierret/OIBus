/**
 * @jest-environment jsdom
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

// need BrowserRouter so Link component is not complaining
import { BrowserRouter } from 'react-router-dom'

import NewNorth from './NewNorth.jsx'

import newConfig from '../../../tests/testConfig'

// ReacFlow does not seem to be working with jest.
// so we have to mock this component
jest.mock('../../../node_modules/react-flow-renderer/dist/ReactFlow.js', () => () => ('ReactFlow'))

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

React.useContext = jest.fn().mockReturnValue({ newConfig })
describe('NewNorth', () => {
  test('display NewNorth page based on config', async () => {
    act(() => {
      ReactDOM.render(
        <BrowserRouter>
          <NewNorth />
        </BrowserRouter>,
        container,
      )
    })
    expect(container).toMatchSnapshot()
  })
})
