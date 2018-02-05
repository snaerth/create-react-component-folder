import React from 'react';
import { shallow } from 'enzyme';

import test from './test';

describe('<test />', () => {
  test('renders', () => {
    const wrapper = shallow(<test />);
    expect(wrapper).toMatchSnapshot();
  });
});
