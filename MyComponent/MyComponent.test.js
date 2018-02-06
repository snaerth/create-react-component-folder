import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from './MyComponent';

describe('<MyComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
