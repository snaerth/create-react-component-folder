import React from 'react';
import { shallow } from 'enzyme';
import Testinga2 from './testinga2';

describe('<Testinga2 />', () => {
  test('renders', () => {
    const wrapper = shallow(<Testinga2 />);
    expect(wrapper).toMatchSnapshot();
  });
});
