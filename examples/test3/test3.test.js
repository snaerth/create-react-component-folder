import React from 'react';
import { shallow } from 'enzyme';
import Test3 from './test3';

describe('<Test3 />', () => {
  test('renders', () => {
    const wrapper = shallow(<Test3 />);
    expect(wrapper).toMatchSnapshot();
  });
});
