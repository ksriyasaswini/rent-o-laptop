import React from 'react';
import { shallow } from 'enzyme';
import UserProfile from './user-profile';

describe('UserProfile', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserProfile />);
    expect(wrapper).toMatchSnapshot();
  });
});
