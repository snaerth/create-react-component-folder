import React from 'react';
import { shallow } from 'enzyme';
import NormalComp from './NormalComp';

describe('<NormalComp />', () => {
  test('renders', () => {
    const wrapper = shallow(<NormalComp />);
    expect(wrapper).toMatchSnapshot();
  });
});
