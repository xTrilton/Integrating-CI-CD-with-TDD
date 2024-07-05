import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShoppingCartComponent from './ShoppingCartComponent';

describe('ShoppingCartComponent', () => {
  test('renders the component', () => {
    render(<ShoppingCartComponent />);
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('displays all products', () => {
    render(<ShoppingCartComponent />);
    expect(screen.getByText('Product 1 - $10')).toBeInTheDocument();
    expect(screen.getByText('Product 2 - $15')).toBeInTheDocument();
    expect(screen.getByText('Product 3 - $20')).toBeInTheDocument();
  });

  test('adds a product to the cart', () => {
    render(<ShoppingCartComponent />);
    const addButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(addButtons[0]); // Add Product 1
    expect(screen.getByText('Product 1 - $10 x 1')).toBeInTheDocument();
    expect(screen.getByText('Total: $10')).toBeInTheDocument();
  });

  test('increases quantity when adding the same product', () => {
    render(<ShoppingCartComponent />);
    const addButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(addButtons[0]); // Add Product 1
    fireEvent.click(addButtons[0]); // Add Product 1 again
    expect(screen.getByText('Product 1 - $10 x 2')).toBeInTheDocument();
    expect(screen.getByText('Total: $20')).toBeInTheDocument();
  });

  test('removes a product from the cart', () => {
    render(<ShoppingCartComponent />);
    const addButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(addButtons[0]); // Add Product 1
    fireEvent.click(addButtons[0]); // Add Product 1 again
    
    const removeButtons = screen.getAllByRole('button', { name: '' }).slice(3); // Get remove buttons
    fireEvent.click(removeButtons[0]); // Remove Product 1 once
    expect(screen.getByText('Product 1 - $10 x 1')).toBeInTheDocument();
    expect(screen.getByText('Total: $10')).toBeInTheDocument();
  });

  test('removes product completely when quantity reaches 0', () => {
    render(<ShoppingCartComponent />);
    const addButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(addButtons[0]); // Add Product 1
    
    const removeButtons = screen.getAllByRole('button', { name: '' }).slice(3); // Get remove buttons
    fireEvent.click(removeButtons[0]); // Remove Product 1
    expect(screen.queryByText('Product 1 - $10 x 1')).not.toBeInTheDocument();
    expect(screen.getByText('Total: $0')).toBeInTheDocument();
  });

  test('calculates total price correctly with multiple products', () => {
    render(<ShoppingCartComponent />);
    const addButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(addButtons[0]); // Add Product 1
    fireEvent.click(addButtons[1]); // Add Product 2
    fireEvent.click(addButtons[1]); // Add Product 2 again
    fireEvent.click(addButtons[2]); // Add Product 3
    expect(screen.getByText('Total: $60')).toBeInTheDocument();
  });
});

