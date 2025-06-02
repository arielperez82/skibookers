import Image from 'next/image';
import Link from 'next/link';
import { render, screen, fireEvent, act } from '@testing-library/react';
import BundlePage from '@webapp/app/bundle/[bundleId]/page';
import { LinkProvider } from '@shared/adapters/web-ui/providers/LinkProvider';
import { ImageProvider } from '@shared/adapters/web-ui/providers/ImageProvider';


describe('BundlePage', () => {
  beforeEach(async () => {
    // Need to explicitly wrap in act() because RTL 15 doesn't yet play well with
    // React 19's `use` hook.
    await act(async () => {
      render(
        <LinkProvider component={Link}>
          <ImageProvider component={Image}>
            <BundlePage params={Promise.resolve({ bundleId: 'bundle-1' })} />
          </ImageProvider>
        </LinkProvider>
      );
    });
  });

  it('increments and decrements adult and child ski passes', async () => {
    const adultPlus = screen.getByRole('button', { name: /increase adult/i });
    const adultMinus = screen.getByRole('button', { name: /decrease adult/i });
    const adultCount = () => screen.getByText('Adult').parentElement!.querySelector('span.w-6')!;
  
    expect(adultCount().textContent).toBe('2');
    fireEvent.click(adultPlus);
    expect(adultCount().textContent).toBe('3');
    fireEvent.click(adultMinus);
    fireEvent.click(adultMinus);
    expect(adultCount().textContent).toBe('1');
    fireEvent.click(adultMinus);
    expect(adultCount().textContent).toBe('0');
    // Should not go below 0
    fireEvent.click(adultMinus);
    expect(adultCount().textContent).toBe('0');
  
    // Child controls
    const childPlus = screen.getByRole('button', { name: /increase child/i });
    const childMinus = screen.getByRole('button', { name: /decrease child/i });
    const childCount = () =>
      screen.getByText('Child').parentElement!.querySelector('span.w-6')!;
  
    expect(childCount().textContent).toBe('1');
    fireEvent.click(childPlus);
    expect(childCount().textContent).toBe('2');
    fireEvent.click(childMinus);
    expect(childCount().textContent).toBe('1');
    fireEvent.click(childMinus);
    expect(childCount().textContent).toBe('0');
    fireEvent.click(childMinus);
    expect(childCount().textContent).toBe('0');
  });

  it('allows transfer to be toggled on and off', () => {
    const transferCheckbox = screen.getByRole('checkbox');
    expect(transferCheckbox).toBeChecked();
    fireEvent.click(transferCheckbox);
    expect(transferCheckbox).not.toBeChecked();
    fireEvent.click(transferCheckbox);
    expect(transferCheckbox).toBeChecked();
  });

  it('shows correct total for ski passes and transfer', () => {
    const getTotal = () => screen.getByText(/total/i).parentElement!.querySelector('span.font-bold.text-xl')!;
    // Initial: 2 adults (590), 1 child (220), transfer (55.9), accommodation (334.1)
    expect(getTotal().textContent).toBe('€1790.00');
    
    // Remove transfer
    const transferCheckbox = screen.getByRole('checkbox');
    fireEvent.click(transferCheckbox);
    expect(getTotal().textContent).toBe('€1734.10');
    
    // Add 1 adult
    const adultPlus = screen.getAllByRole('button', { name: /increase adult/i })[0];
    fireEvent.click(adultPlus);
    expect(getTotal().textContent).toBe('€2324.10');
    
    // Remove all children
    const childMinus = screen.getAllByRole('button', { name: /decrease child/i })[0];
    fireEvent.click(childMinus);
    expect(getTotal().textContent).toBe('€2104.10');
    
    // Remove all adults
    const adultMinus = screen.getAllByRole('button', { name: /decrease adult/i })[0];
    fireEvent.click(adultMinus);
    fireEvent.click(adultMinus);
    fireEvent.click(adultMinus);
    
    expect(getTotal().textContent).toBe('€334.10');
  });
}); 