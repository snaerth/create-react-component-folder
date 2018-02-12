import React from 'react';
import { shallow } from 'enzyme';
import TypescriptComp from './TypescriptComp';

describe('<TypescriptComp />', () => {
  test('renders', () => {
    const wrapper = shallow(<TypescriptComp />);
    expect(wrapper).toMatchSnapshot();
  });
});
  