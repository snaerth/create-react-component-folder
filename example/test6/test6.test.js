import React from 'react';
import { shallow } from 'enzyme';

import test6 from './test6';

describe('<test6 />', () => {
  test('renders', () => {
    const wrapper = shallow(<test6 />);
    expect(wrapper).toMatchSnapshot();
  });
});
