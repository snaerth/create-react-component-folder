import React from 'react';
import { shallow } from 'enzyme';
import TypescriptNativeComp from './TypescriptNativeComp';

describe('<TypescriptNativeComp />', () => {
  test('renders', () => {
    const wrapper = shallow(<TypescriptNativeComp />);
    expect(wrapper).toMatchSnapshot();
  });
});
  