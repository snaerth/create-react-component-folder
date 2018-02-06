import React from 'react';
import { shallow } from 'enzyme';
import CompWithProps from './CompWithProps';

describe('<CompWithProps />', () => {
  test('renders', () => {
    const wrapper = shallow(<CompWithProps />);
    expect(wrapper).toMatchSnapshot();
  });
});
