import React from 'react';
import { shallow } from 'enzyme';
import Calender from './calender';

describe('Calender', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Calender />);
    expect(wrapper).toMatchSnapshot();
  });
});
