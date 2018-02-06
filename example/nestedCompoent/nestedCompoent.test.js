import React from 'react';
import { shallow } from 'enzyme';
import NestedCompoent from './nestedCompoent';

describe('<NestedCompoent />', () => {
  test('renders', () => {
    const wrapper = shallow(<NestedCompoent />);
    expect(wrapper).toMatchSnapshot();
  });
});
