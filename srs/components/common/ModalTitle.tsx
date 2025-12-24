interface ModalTitleProps {
    isEdit?: boolean;
    pageTitle: string;
}

export const ModalTitle = ({ isEdit = false, pageTitle }: ModalTitleProps) => {
    return (
        <span>
            {isEdit ? `Edit ${pageTitle}` : `Add New ${pageTitle}`}
        </span>
    );
};
