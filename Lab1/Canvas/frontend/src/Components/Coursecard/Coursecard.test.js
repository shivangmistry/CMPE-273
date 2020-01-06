// import React from 'react';
import { shallow } from 'enzyme';
import Coursecard from './Coursecard';

describe('Coursecard', () => {
    let wrapper;
    beforeEach(()=>{wrapper = shallow(<Coursecard/>)});
    
  it('should render correctly in "debug" mode', () => {
    expect(wrapper.find("img")).to.have.lengthOf(1);
    // const component = shallow(<Coursecard/>);
    // expect(component).toMatchSnapshot();
  });
});