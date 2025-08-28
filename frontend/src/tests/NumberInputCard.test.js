import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NumberInputCard from '../components/NumberInputCard';

jest.mock('../api/numbers', () => ({
  submitNumbers: jest.fn(async (numbers) => ({
    result: numbers.map(n => ({ number: n, alpha: `Word${n}` }))
  }))
}));

jest.mock('../components/Over9000Image', () => (props) => <img alt={props.alt} />);

import { submitNumbers } from '../api/numbers';

describe('NumberInputCard', () => {
  it('renders without crashing', () => {
    render(<NumberInputCard />);
    expect(screen.getByText(/Enter a list of numbers/i)).toBeInTheDocument();
  });

  it('shows error for invalid characters', () => {
    render(<NumberInputCard />);
    fireEvent.change(screen.getByPlaceholderText(/Type in here/i), { target: { value: '1,2,a' } });
    expect(screen.getByText(/only numbers, spaces, commas, and negative signs/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sort text/i })).toBeDisabled();
  });

  it('shows error for non-integer values', () => {
    render(<NumberInputCard />);
    fireEvent.change(screen.getByPlaceholderText(/Type in here/i), { target: { value: '1.5,2' } });
    // The character check triggers first, so expect the character error
    expect(screen.getByText(/only numbers, spaces, commas, and negative signs/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sort text/i })).toBeDisabled();
  });

  it('handles empty input and disables submit', () => {
    render(<NumberInputCard />);
    fireEvent.change(screen.getByPlaceholderText(/Type in here/i), { target: { value: '' } });
    expect(screen.getByRole('button', { name: /sort text/i })).toBeDisabled();
  });

  it('handles large input', async () => {
    render(<NumberInputCard />);
    const bigInput = Array.from({ length: 1000 }, (_, i) => i).join(',');
    fireEvent.change(screen.getByPlaceholderText(/Type in here/i), { target: { value: bigInput } });
    fireEvent.click(screen.getByRole('button', { name: /sort text/i }));
    await waitFor(() => expect(submitNumbers).toHaveBeenCalled());
  });

  it('renders the over 9000 image for numbers > 9000', async () => {
  require('../api/numbers').submitNumbers.mockResolvedValueOnce({
    result: [
      { number: 9001, alpha: 'Word9001' },
      { number: 5, alpha: 'Word5' }
    ]
  });

  render(<NumberInputCard />);

  fireEvent.change(screen.getByPlaceholderText(/Type in here/i), { target: { value: '9001,5' } });
  fireEvent.click(screen.getByRole('button', { name: /sort text/i }));

  const over9000Img = await screen.findByAltText('Word9001');
  expect(over9000Img).toBeInTheDocument();
  expect(over9000Img).toHaveAttribute('alt', 'Word9001');
  expect(screen.getByText(/Word5/i)).toBeInTheDocument();
});

});
