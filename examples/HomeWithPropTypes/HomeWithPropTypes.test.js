import React from 'react';
import { shallow } from 'enzyme';
import HomeWithPropTypes from './HomeWithPropTypes';

describe('<HomeWithPropTypes />', () => {
  test('renders', () => {
    const wrapper = shallow(<HomeWithPropTypes />);
    expect(wrapper).toMatchSnapshot();
  });
});
