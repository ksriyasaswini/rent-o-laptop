import React from 'react';
import { shallow } from 'enzyme';
import UserBookings from './user-bookings';

describe('UserBookings', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserBookings />);
    expect(wrapper).toMatchSnapshot();
  });
});
