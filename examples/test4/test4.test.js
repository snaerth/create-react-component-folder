import React from 'react';
import { shallow } from 'enzyme';
import Test4 from './test4';

describe('<Test4 />', () => {
  test('renders', () => {
    const wrapper = shallow(<Test4 />);
    expect(wrapper).toMatchSnapshot();
  });
});
