// types/generic-modal.types.ts
import { BaseModal, BaseModalProps } from "./BaseModal.js";

export type GenericModalProps = {
  // The arbitrary content
  children: React.ReactNode;

  // Optional title
  title?: string | React.ReactNode;

  // Optional footer actions
  actions?: React.ReactNode;

  // Optional: Pass through any BaseModal props
  baseModalProps?: Partial<
    Omit<
      BaseModalProps,
      "modalId" | "modalType" | "open" | "children" | "title" | "actions"
    >
  >;

  // Close handler
  onClose?: () => void;
};

export const GenericModal: React.FC<
  GenericModalProps & {
    modalId: string;
    isTopModal: boolean;
  }
> = ({
  // children,
  // title,
  // actions,
  // baseModalProps = {},
  // onClose,
  // modalId,
  // isTopModal,
}) => {
  return (
    <></>
    // <BaseModal
    //   modalId={modalId}
    //   modalType="generic"
    //   open={true}
    //   title={title}
    //   actions={actions}
    //   closeOnBackdropClick={false}
    //   onClose={onClose}
    //   {...baseModalProps}
    // >
    //   {children}
    // </BaseModal>
  );
};
