import { render, screen } from '@testing-library/react'

import { Loader } from '@/components'

describe('Loader component', () => {
  it('renders correctly', () => {
    render(<Loader />)

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })
})
