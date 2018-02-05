import React from 'react';
import { shallow } from 'enzyme';

import test3 from './test3';

describe('<test3 />', () => {
  test('renders', () => {
    const wrapper = shallow(<test3 />);
    expect(wrapper).toMatchSnapshot();
  });
});
