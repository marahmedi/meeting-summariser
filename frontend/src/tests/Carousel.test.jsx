import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

const mockData = {
  user_stories: [
    {
      id: 1,
      title: 'Test Title 1',
      description: 'Test Description 1',
      acceptance_criteria: ['Test Criteria 1.1', 'Test Criteria 1.2'],
    },
    {
      id: 2,
      title: 'Test Title 2',
      description: 'Test Description 2',
      acceptance_criteria: ['Test Criteria 2.1', 'Test Criteria 2.2'],
    },
  ],
};

test('renders Carousel component', () => {
  const { getByText } = render(<Carousel data={mockData} />);
  
  // Check that the first story is displayed
  expect(getByText('Title: Test Title 1')).toBeInTheDocument();
  expect(getByText('Description Test Description 1')).toBeInTheDocument();
  expect(getByText('Test Criteria 1.1')).toBeInTheDocument();
  expect(getByText('Test Criteria 1.2')).toBeInTheDocument();
});

test('navigates to next story', () => {
  const { getByText } = render(<Carousel data={mockData} />);
  
  // Click the right arrow to navigate to the next story
  fireEvent.click(getByText('→'));
  
  // Check that the second story is displayed
  expect(getByText('Title: Test Title 2')).toBeInTheDocument();
  expect(getByText('Description Test Description 2')).toBeInTheDocument();
  expect(getByText('Test Criteria 2.1')).toBeInTheDocument();
  expect(getByText('Test Criteria 2.2')).toBeInTheDocument();
});

test('navigates to previous story', () => {
  const { getByText } = render(<Carousel data={mockData} />);
  
  // Click the right arrow to navigate to the next story
  fireEvent.click(getByText('→'));
  
  // Click the left arrow to navigate back to the previous story
  fireEvent.click(getByText('←'));
  
  // Check that the first story is displayed again
  expect(getByText('Title: Test Title 1')).toBeInTheDocument();
  expect(getByText('Description Test Description 1')).toBeInTheDocument();
  expect(getByText('Test Criteria 1.1')).toBeInTheDocument();
  expect(getByText('Test Criteria 1.2')).toBeInTheDocument();
});

test('downloads story', () => {
  const { getByText } = render(<Carousel data={mockData} />);
  
  // Click the download button
  fireEvent.click(getByText('Download'));
  
  // Check that the download function is called
  // This requires mocking the download function and is left as an exercise
});