import React from 'react';
import { shallow } from 'enzyme';
import NativeCompWithProps from './NativeCompWithProps';

describe('<NativeCompWithProps />', () => {
  test('renders', () => {
    const wrapper = shallow(<NativeCompWithProps />);
    expect(wrapper).toMatchSnapshot();
  });
});
