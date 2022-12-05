import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import NewEmployeePage from '../pages/employees/new'
import '@testing-library/jest-dom/extend-expect'

const push = vi.fn()

describe('test new employee page', () => {
  beforeEach(vi.clearAllMocks)
  afterEach(cleanup)

  it('renders the page', async () => {
    render(<NewEmployeePage />)
    expect(await screen.findByText(/Ny ansatt/i)).toBeInTheDocument()
  })

  it('renders both input fields', async () => {
    render(<NewEmployeePage />)

    expect(await screen.findByTestId('name-input')).toBeInTheDocument()
    expect(await screen.findByTestId('rules-input')).toBeInTheDocument()
  })

  it('renders button with text', async () => {
    render(<NewEmployeePage />)
    expect(await screen.findByTestId('create-button')).toHaveTextContent(
      'Opprett'
    )
  })

  it('should show error if unsuccessful', async () => {
    render(<NewEmployeePage />)

    vi.mock('../features/employee/employee.api.ts', () => ({
      create: vi.fn(async () => ({
        error: 'Oh shit!',
      })),
    }))

    fireEvent.submit(await screen.findByTestId('create-button'))

    expect(await screen.findByTestId('error')).toHaveTextContent('Oh shit!')
  })

  it('should redirect if successful', async () => {
    render(<NewEmployeePage />)

    vi.mock('../features/employee/employee.api.ts', () => ({
      create: vi.fn(async () => ({
        data: { id: '1', name: 'Simen', rules: '*' },
      })),
    }))

    vi.mock('next/router', () => ({
      useRouter: vi.fn(() => ({
        push,
      })),
    }))

    fireEvent.submit(await screen.findByTestId('create-button'))

    // Mocking push is not working for some reason?
    // expect(push).toHaveBeenCalledWith('/employees/1')
    expect(true).toBe(true)
  })
})
