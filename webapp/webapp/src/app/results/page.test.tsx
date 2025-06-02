'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ResultsPage from '@webapp/app/results/page'
import { LinkProvider } from '@shared/adapters/web-ui/providers/LinkProvider'
import { ImageProvider } from '@shared/adapters/web-ui/providers/ImageProvider'

// Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn()
})
afterEach(() => {
  jest.resetAllMocks()
})

const ResultsPageWithProviders = () => {
  return (
    <LinkProvider component={Link}>
      <ImageProvider component={Image}>
        <ResultsPage />
      </ImageProvider>
    </LinkProvider>
  )
}

describe('ResultsPage', () => {
  describe('when the screen is loading', () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ resorts: [] })
      })
    });

    it('shows the loading message', async () => {
      render(<ResultsPageWithProviders />)
      await waitFor(() => {
        expect(screen.getByText(/loading resorts/i)).toBeInTheDocument()
      })
    })
  });

  describe('when there are no results', () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ resorts: [] })
      })
    });

    it('show no recommendations message', async () => {
      render(<ResultsPageWithProviders />)
      await waitFor(() => {
        expect(screen.getByText(/no resorts found/i)).toBeInTheDocument()
      })
    })
  });

  describe('when there are results', () => {
    beforeEach(() => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({
          resorts: [
            {
              id: 'alps-1',
              name: 'Alpine Dream Resort',
              image: 'https://test.com/image.jpg',
              matchPercent: 92,
              description: 'A top-rated resort in the heart of the Alps with world-class amenities.',
              match: 92,
              conditions: { label: 'Excellent', icon: '😃' },
              skill: 'Advanced',
              runs: 45,
            }
          ]
        })
      })
    });

    it('renders resorts', async () => {       
      render(<ResultsPageWithProviders />)
      await waitFor(() => {
        expect(screen.getByText(/alpine dream resort/i)).toBeInTheDocument()
        expect(screen.getByText(/92% match/i)).toBeInTheDocument()
        expect(screen.getByText(/view bundle options/i)).toBeInTheDocument()
      })
    })

    it('resort title is a link to the resort details page', async () => {
      render(<ResultsPageWithProviders />)
      await waitFor(() => {
        const link = screen.getByRole('link', { name: /alpine dream resort/i })
        expect(link).toHaveAttribute('href', '/resort/alps-1')
      })
    })

    it('bundle button is a link to the bundle page', async () => {
      render(<ResultsPageWithProviders />)
      await waitFor(() => {
        const link = screen.getByRole('link', { name: /view bundle options/i })
        expect(link).toHaveAttribute('href', '/bundle/alps-1')
      })
    })
  })
}) 