import AppFunctional from "./AppFunctional"
import React from 'react'
import { render, screen, fireEvent, getByTestId } from '@testing-library/react'

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test ('render without errors', () => {
  render (<AppFunctional />)
})

test('email field', async () => {
  render (<AppFunctional />)
  const email = expect(screen.getByTestId('email'))
  expect(email).toBeInTheDocument
})

test('renders left button', () => {
  render(<AppFunctional />)
  const left = expect(screen.getByTestId('left'))
  expect(left).toBeInTheDocument
})

test('render right button', () => {
  render(<AppFunctional />)
  const right = expect(screen.getByTestId('right'))
  expect(right).toBeInTheDocument
})

test('render up button', () => {
  render(<AppFunctional />)
  const up = expect(screen.getByTestId('up'))
  expect(up).toBeInTheDocument
})

test('render down button', () => {
  render(<AppFunctional />)
  const down = expect(screen.getByTestId('down'))
  expect(down).toBeInTheDocument
})

test('render reset button', () => {
  render(<AppFunctional />)
  const reset = expect(screen.getByTestId('reset'))
  expect(reset).toBeInTheDocument
})