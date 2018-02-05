import React from 'react';
import { shallow } from 'enzyme';

import test4 from './test4';

describe('<test4 />', () => {
  test('renders', () => {
    const wrapper = shallow(<test4 />);
    expect(wrapper).toMatchSnapshot();
  });
});
