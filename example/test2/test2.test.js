import React from 'react';
import { shallow } from 'enzyme';

import test2 from './test2';

describe('<test2 />', () => {
  test('renders', () => {
    const wrapper = shallow(<test2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
