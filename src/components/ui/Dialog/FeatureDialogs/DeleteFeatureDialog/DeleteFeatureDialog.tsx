import { FormEvent, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
// Components
import toast from "react-hot-toast";
import DialogBox from "../../Dialog";
import ButtonWithIcon from "@/components/ui/Button/ButtonWithIcon";
// Images
import EditIcon from "@/images/icons/svg/edit-white.svg";
// Types
type DeleteFeatureDialogProps = {
  featureId: string;
  showButton?: boolean;
  isOpenProp?: boolean;
  close?: () => void;
};

// Query
const DELETE_FEATURE = gql`
  mutation DeleteFeature($id: uuid) {
    delete_features(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

function DeleteFeatureDialog({
  featureId,
  isOpenProp,
  close,
  showButton,
}: DeleteFeatureDialogProps): JSX.Element {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(isOpenProp || false);

  useEffect(() => {
    setIsOpen(isOpenProp as boolean);
  }, [isOpenProp]);

  function closeModal() {
    setIsOpen(false);
    if (close) {
      close();
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  const [confirmFeature] = useMutation(DELETE_FEATURE, {
    onCompleted: () => closeModal(),
  });

  const handleFeatureConfirm = (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      confirmFeature({
        variables: {
          id: featureId,
        },
      }).then(() => {
        router.back();
      }),
      {
        loading: "Deleting Feature...",
        success: <b>Feature Deleted!</b>,
        error: <b>Error! Feature deletion failed</b>,
      }
    );
  };

  return (
    <>
      {showButton && (
        <ButtonWithIcon
          onClick={openModal}
          label={"Delete Feature"}
          image={EditIcon}
        />
      )}

      <DialogBox
        title={"Delete Feature"}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <div>
          <form onSubmit={handleFeatureConfirm}>
            <div>Are you sure you want to delete the feature?</div>
            <div className="w-full grid grid-cols-perc-30-2 mt-2 gap-1">
              <button
                type="button"
                onClick={closeModal}
                className="py-3 px-1 border-2 border-theme_blue rounded"
              >
                Cancel
              </button>
              <input
                value="Confirm"
                type="submit"
                className="py-3 bg-theme_blue text-white rounded"
              />
            </div>
          </form>
        </div>
      </DialogBox>
    </>
  );
}

export default DeleteFeatureDialog;
