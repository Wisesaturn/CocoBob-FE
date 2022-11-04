import { useCallback, ReactElement } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  name: string | ReactElement;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: Function;
  className?: string;
}

const FormButtonContainer = styled.button<{ disabled: boolean }>`
  background: var(--primary-main);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  width: 100%;

  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fefefe;

  &:active {
    opacity: 0.8;
  }
`;
export default function FormButton(props: ButtonProps) {
  const { name, disabled, onClick, className } = props;

  const onClickButton = useCallback(() => !disabled && onClick && onClick(), [onClick]);

  return (
    <FormButtonContainer className={className} onClick={onClickButton} disabled={disabled ?? false}>
      {name}
    </FormButtonContainer>
  );
}
