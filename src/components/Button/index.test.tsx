import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './index';

const onClickMock = jest.fn();

test('disabled true일 때, 버튼 비활성화 및 onClick 호출 X', () => {
  const properties = {
    label: '테스트 버튼',
    disabled: true,
    onClick: onClickMock,
  };
  render(<Button {...properties} />);
  const renderedButton = screen.getByRole('button');

  expect(renderedButton).toBeDisabled();
  fireEvent.click(renderedButton);
  expect(onClickMock).not.toBeCalled();
});

test('disabled false일 때, 버튼 활성화 및 onClick 호출 O', () => {
  const properties = {
    label: '테스트 버튼',
    disabled: false,
    onClick: onClickMock,
  };
  render(<Button {...properties} />);
  const renderedButton = screen.getByRole('button');

  expect(renderedButton).not.toBeDisabled();
  fireEvent.click(renderedButton);
  expect(onClickMock).toBeCalled();
});
