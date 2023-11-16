import '@testing-library/jest-dom';

import { render, fireEvent, screen } from '@testing-library/svelte';

import App from './App.svelte';

test('shows proper heading when rendered', () => {
  render(App);
  const heading = screen.getByText('Website to PDF Converter');
  expect(heading).toBeInTheDocument();
});

test('changes button text on click', async () => {
  render(App);
  const button = screen.getByText('FONT SIZE');

  expect(button).toHaveTextContent('FONT SIZE');
});
