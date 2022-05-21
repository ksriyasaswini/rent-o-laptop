import React from 'react';
import { shallow } from 'enzyme';
import UserDevice from './user-device';

describe('UserDevice', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserDevice />);
    expect(wrapper).toMatchSnapshot();
  });
});
