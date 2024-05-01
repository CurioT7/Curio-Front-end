import DropDown from "../../../Components/feedSettings/childs/DropDown";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('DropDown', () => {
    it('renders without crashing', () => {
      render(<DropDown />);
    });
  
    it('calls onChangeSort when a sort option is selected', () => {
      const handleChangeSort = jest.fn();
      const { getByTestId } = render(<DropDown onChangeSort={handleChangeSort} isSort />);
      fireEvent.change(getByTestId('sort-dropdown'), { target: { value: 'New' } });
      expect(handleChangeSort).toHaveBeenCalled();
    });
  
    it('calls onChangeRemember when the remember switch is clicked', () => {
      const handleChangeRemember = jest.fn();
      const { getByTestId } = render(<DropDown onChangeRemember={handleChangeRemember} />);
      fireEvent.click(getByTestId('remember-switch'));
      expect(handleChangeRemember).toHaveBeenCalled();
    });
  });