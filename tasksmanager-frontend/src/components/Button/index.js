import { StyledButton } from './styles';

export default function Button({ isOutlined = false, ...props }) {
  return (
    <StyledButton>
      <button
        className={`buttonBtn ${isOutlined ? 'outlined' : ''}`}
        {...props}
      />
    </StyledButton>
  );
}
