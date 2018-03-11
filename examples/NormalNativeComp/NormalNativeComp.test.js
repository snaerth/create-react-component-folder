import React from 'react';
import { shallow } from 'enzyme';
import NormalNativeComp from './NormalNativeComp';

describe('<NormalNativeComp />', () => {
  test('renders', () => {
    const wrapper = shallow(<NormalNativeComp />);
    expect(wrapper).toMatchSnapshot();
  });
});
