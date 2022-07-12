import { StyledPagination } from '../styles/pagination';

export default function Pagination(props: any) {
  const { page, totalPages, handleClickLeft, handleClickRight } = props;

  return (
    <StyledPagination>
      <div className="pagination-container">
        <button onClick={handleClickLeft}>
          <div>◀️</div>
        </button>
        <div>
          {page} de {totalPages}
        </div>
        <button onClick={handleClickRight}>
          <div>▶️</div>
        </button>
      </div>
    </StyledPagination>
  );
}
