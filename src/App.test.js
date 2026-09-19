import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('adds, completes, and deletes a todo', () => {
  localStorage.clear();
  render(<App />);

  const input = screen.getByPlaceholderText('Enter Item...');
  fireEvent.change(input, { target: { value: 'First task' } });
  fireEvent.click(screen.getByRole('button', { name: /add new task/i }));

  const todo = screen.getByText('First task');
  expect(todo).toBeInTheDocument();

  fireEvent.click(todo);
  expect(todo).toHaveClass('done');

  fireEvent.click(screen.getByText('⚔️'));
  expect(screen.queryByText('First task')).not.toBeInTheDocument();
});

test('deletes one legacy todo that does not have an id', () => {
  localStorage.setItem(
    'Todos',
    JSON.stringify([{ text: 'Old task', completed: false }])
  );
  render(<App />);

  fireEvent.click(screen.getByText('⚔️'));

  expect(screen.queryByText('Old task')).not.toBeInTheDocument();
});
