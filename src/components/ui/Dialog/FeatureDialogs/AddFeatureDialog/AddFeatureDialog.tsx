import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { useSelector } from "@xstate/react";
// Context
import { useAppContext } from "src/context/state";
// Components
import toast from "react-hot-toast";
import Button from "../../../Button/Button";
import GeneralInput from "../../../Input/GeneralInput";
import TagInput from "../../../Input/TagInput";
import DialogBox from "../../Dialog";
// Types
interface AddFeatureDialogProps {
  update: () => void;
}
// Query
const INSERT_FEATURE = gql`
  mutation InsertStack(
    $name: String!
    $description: String
    $owner_github_id: String!
    $project_id: uuid
    $project_plain_id: Int
    $tags: jsonb
  ) {
    insert_features_one(
      object: {
        name: $name
        description: $description
        owner_github_id: $owner_github_id
        project_id: $project_id
        project_plain_id: $project_plain_id
        status: 2
        tags: $tags
      }
    ) {
      name
    }
  }
`;

const getContext = (state: any) => {
  return { id: state?.context?.id, plain_id: state?.context?.plain_id };
};

function AddFeatureDialog({ update }: AddFeatureDialogProps): JSX.Element {
  const { user } = useUser();
  const AppMachine = useAppContext();
  const activeProjectData = useSelector<any, any>(AppMachine, getContext);

  const [isOpen, setIsOpen] = useState(false);
  const [featureName, setFeatureName] = useState("" as string);
  const [featureDescription, setFeatureDescription] = useState("" as string);
  const [featureTags, setFeatureTags] = useState([] as string[]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [pushFeature] = useMutation(INSERT_FEATURE, {
    onCompleted: () => closeModal(),
  });

  const handleFeatureConfirm = () => {
    if (user?.sub) {
      toast.promise(
        pushFeature({
          variables: {
            name: featureName,
            description: featureDescription,
            tags: featureTags,
            owner_github_id: user?.sub,
            project_id: activeProjectData?.id,
            project_plain_id: activeProjectData?.plain_id,
          },
        }).then(() => {
          update();
        }),
        {
          loading: "Adding Feature...",
          success: <b>New Feature Added!</b>,
          error: <b>Error! Feature Insertion failed</b>,
        }
      );
    } else {
      toast.error("Unauthorized!");
    }
  };

  return (
    <>
      <Button label={"+ Add"} onClick={openModal} isHollow />

      <DialogBox title={"Add Feature"} isOpen={isOpen} closeModal={closeModal}>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFeatureConfirm();
            }}
            className="w-full flex flex-col items-center"
          >
            <div className="w-full mb-2">
              <GeneralInput
                id={"name"}
                labelText={"Name"}
                placeholder={"Cool new feature"}
                type="text"
                onChange={(e) => setFeatureName(e.target.value)}
                required
              />
            </div>
            <div className="w-full mb-2">
              <GeneralInput
                id={"description"}
                labelText={"Description"}
                placeholder={"Gives the app wings"}
                type="text"
                onChange={(e) => setFeatureDescription(e.target.value)}
                required
              />
            </div>
            <div className="w-full mb-2">
              <TagInput
                labelText={"Tags"}
                id={"tags"}
                onSubmit={(dataList: string[]) => setFeatureTags(dataList)}
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

export default AddFeatureDialog;
