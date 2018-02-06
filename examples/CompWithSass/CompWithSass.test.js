import React from 'react';
import { shallow } from 'enzyme';
import CompWithSass from './CompWithSass';

describe('<CompWithSass />', () => {
  test('renders', () => {
    const wrapper = shallow(<CompWithSass />);
    expect(wrapper).toMatchSnapshot();
  });
});
