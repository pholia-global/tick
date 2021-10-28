import { FormEvent, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
// Components
import toast from "react-hot-toast";
import DialogBox from "../../Dialog";
import GeneralInput from "../../../Input/GeneralInput";
import TagInput from "../../../Input/TagInput";
import ButtonWithIcon from "@/components/ui/Button/ButtonWithIcon";
// Images
import EditIcon from "@/images/icons/svg/edit-white.svg";
// Types
type UpdateFeatureDialogProps = {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  showButton?: boolean;
  isOpenProp?: boolean;
  close?: () => void;
  update: () => void;
};

// Query
const UPDATE_FEATURE = gql`
  mutation UpdateFeature($id: uuid, $set: features_set_input!) {
    update_features(where: { id: { _eq: $id } }, _set: $set) {
      affected_rows
    }
  }
`;

function UpdateFeatureDialog({
  id,
  title,
  description,
  tags,
  isOpenProp,
  close,
  showButton,
  update,
}: UpdateFeatureDialogProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(isOpenProp || false);
  const [featureTitle, setFeatureTitle] = useState(title);
  const [featureDescription, setFeatureDescription] = useState(description);
  const [featureTags, setFeatureTags] = useState(tags);

  useEffect(() => {
    setIsOpen(isOpenProp as boolean);
    setFeatureTitle(title);
    setFeatureDescription(description);
    setFeatureTags(tags);
  }, [isOpenProp, title, description, tags]);

  function closeModal() {
    setIsOpen(false);
    if (close) {
      close();
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  const [confirmFeature] = useMutation(UPDATE_FEATURE, {
    onCompleted: () => closeModal(),
  });

  const handleFeatureConfirm = (e: FormEvent) => {
    e.preventDefault();
    toast.promise(
      confirmFeature({
        variables: {
          id: id,
          set: {
            tags: featureTags,
            name: featureTitle,
            description: featureDescription,
            updated_at: new Date(),
          },
        },
      }).then(() => {
        update();
      }),
      {
        loading: "Updating Feature...",
        success: <b>Feature Updated!</b>,
        error: <b>Error! Feature updation failed</b>,
      }
    );
  };

  return (
    <>
      {showButton && (
        <ButtonWithIcon
          onClick={openModal}
          label={"Update Feature"}
          image={EditIcon}
        />
      )}

      <DialogBox
        title={"Update Feature"}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <div>
          <form onSubmit={handleFeatureConfirm}>
            <div className="w-full mb-2">
              <GeneralInput
                id={"title"}
                labelText="Title"
                value={featureTitle}
                onChange={(e) => setFeatureTitle(e.target.value)}
                required
              />
            </div>
            <div className="w-full mb-2">
              <GeneralInput
                id={"description"}
                labelText="Description"
                value={featureDescription}
                onChange={(e) => setFeatureDescription(e.target.value)}
              />
            </div>
            <div className="w-full mb-2">
              <TagInput
                id={"tags"}
                labelText="Tags"
                tagList={featureTags}
                onSubmit={(dataList) => setFeatureTags(dataList)}
              />
            </div>
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

export default UpdateFeatureDialog;
