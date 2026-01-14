import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SensorList from '../components/SensorList';

beforeEach(()=>{
  global.fetch = jest.fn();
});

afterEach(()=>{
  jest.resetAllMocks();
});

test('renders sensors from API', async ()=>{
  const fake = [{id:'1', name:'Sensor A'}, {id:'2', name:'Sensor B'}];
  global.fetch.mockResolvedValueOnce({ ok: true, json: async ()=> fake });

  render(<SensorList/>);
  expect(screen.getByText(/Loading sensors/i)).toBeInTheDocument();

  await waitFor(()=> expect(screen.getByText('Sensor A')).toBeInTheDocument());
  expect(screen.getByText('Sensor B')).toBeInTheDocument();
});
