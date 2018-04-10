import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from './myComponent';

describe('<MyComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
