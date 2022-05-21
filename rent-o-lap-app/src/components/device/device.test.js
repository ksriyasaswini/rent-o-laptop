import React from 'react';
import { shallow } from 'enzyme';
import Device from './device';

describe('Device', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Device />);
    expect(wrapper).toMatchSnapshot();
  });
});
