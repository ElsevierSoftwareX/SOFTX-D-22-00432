import React from "react";
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import Sidebar from "./Sidebar";

describe('Sidebar testing', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = mount(<Sidebar />);
    });

    it('should contain Sidebar text', () => {
        expect(wrapper.find('h1').text()).toContain("Sidebar");
    });

    // it('should contain Profile component', () => {
    //     expect(wrapper.find('Profile')).toHaveLength(1);
    // });
});