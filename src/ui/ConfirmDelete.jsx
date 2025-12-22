import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Description = styled.p`
  color: var(--color-grey-500);
  margin-bottom: 1.2rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

function ConfirmDelete({
  resourceName = "item",
  onConfirm,
  onCloseModal,
  disabled = false,
}) {
  return (
    <StyledConfirmDelete role="dialog" aria-modal="true">
      <Heading as="h3">Delete {resourceName}</Heading>

      <Description>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </Description>

      <Actions>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>

        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </Actions>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
