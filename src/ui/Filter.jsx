import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

/* ================= STYLES ================= */

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

/* ================= COMPONENT ================= */

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultValue = options.at(0)?.value;
  const currentFilter = searchParams.get(filterField) ?? defaultValue;

  function handleClick(value) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(filterField, value);
      return params;
    });
  }

  return (
    <StyledFilter>
      {options.map(({ value, label }) => (
        <FilterButton
          key={value}
          $active={value === currentFilter}
          disabled={options.value === currentFilter}
          onClick={() => handleClick(value)}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
