import { StyledLoading } from '../styles/loading';

export default function Loading() {
  return (
    <StyledLoading>
      <div className="lds-hourglass"></div>
    </StyledLoading>
  );
}
