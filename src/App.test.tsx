import React from 'react';
import { render, fireEvent, getByText, act } from '@testing-library/react';
import App from './App';

describe('Fetch API', () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = (global as any).fetch;
  });

  afterEach(() => {
    (global as any).fetch = originFetch;
  });

  it('Check if search by tag exists', async () => {
    let component: any;
    await act(async () => {
      component = render(<App/>);
    })
    const element = component.getByLabelText('Search by tag')
    expect(element).toBeInTheDocument();
  })

  it('Check if search by name exists', async () => {
    let component: any;
    await act(async () => {
      component = render(<App/>);
    })
    const element = component.getByLabelText('Search by name')
    expect(element).toBeInTheDocument();
  })
})
