import React from 'react';
import { shallow } from 'enzyme';
import UserDevices from './user-devices';

describe('UserDevices', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserDevices />);
    expect(wrapper).toMatchSnapshot();
  });
});
