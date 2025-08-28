import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /numbers to words converter/i })).toBeInTheDocument();
  });

  it('renders the NumberInputCard', () => {
    render(<App />);
    // Check for the input placeholder from NumberInputCard
    expect(screen.getByPlaceholderText(/type in here/i)).toBeInTheDocument();
  });

  it('renders the instructions', () => {
    render(<App />);
    expect(screen.getByText(/enter a list of numbers/i)).toBeInTheDocument();
    expect(screen.getByText(/e.g. 1,2,3,11,8999,16/i)).toBeInTheDocument();
  });
});
