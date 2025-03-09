import { render, screen, fireEvent } from '@testing-library/react';
import Button from '.';

describe('Button Component', () => {
  test('should render the button with the correct text', () => {
    render(<Button variant="primary" size="medium">Click Me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click Me');
  });

  test('should apply the correct classes for variant and size', () => {
    render(<Button variant="primary" size="small">Click Me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--primary');
    expect(button).toHaveClass('btn--small');
  });

  test('should call the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" size="medium" onClick={handleClick}>Click Me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('should not call onClick function when button is disabled', () => {
    const handleClick = jest.fn();
    render(<Button variant="primary" size="medium" onClick={handleClick} disabled>Click Me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('should render with the correct title attribute', () => {
    render(<Button variant="primary" size="medium" title="This is a button">Click Me</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title', 'This is a button');
  });
});
