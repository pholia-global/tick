import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { gql, useQuery, useMutation } from "@apollo/client";
import toast from "react-hot-toast";
// Constants
import { FEATURE_STATUS } from "src/constants/enums";
// Components
import ProjectLayout from "@/components/layout/ProjectLayout";
import BackButton from "@/components/navigation/BackButton/BackButton";
import ButtonWithIcon, {
  BUTTON_TYPE,
} from "@/components/ui/Button/ButtonWithIcon";
import { H3, H6 } from "@/components/ui/Typography";
import Heading from "@/components/ui/Heading/Heading";
import TaskList from "@/components/ui/Lists/TaskList/TaskList";
import Spinner from "@/components/ui/Spinner/Spinner";
import PopoverBox from "@/components/ui/Popover/PopoverBox";
import DeleteFeatureDialog from "@/components/ui/Dialog/FeatureDialogs/DeleteFeatureDialog/DeleteFeatureDialog";
import UpdateFeatureDialog from "@/components/ui/Dialog/FeatureDialogs/UpdateFeatureDialog/UpdateFeatureDialog";
// Images
import checkBlueIcon from "@/images/icons/svg/check-blue.svg";
import checkWhiteIcon from "@/images/icons/svg/check-white.svg";
import MenuIconSVG from "@/images/icons/svg/menu.svg";
import EditIcon from "@/images/icons/svg/edit-blue.svg";
import TrashIcon from "@/images/icons/svg/trash-red.svg";

interface FeatureType {
  name: string;
  description: string;
  status: number;
  tags: string[];
  tasks: [
    {
      id: string;
      status: number;
      title: string;
      tags: string[];
      description: string;
    }
  ];
}

const GET_TASKS = gql`
  query GetTasks($id: uuid!) {
    features(where: { id: { _eq: $id } }) {
      name
      description
      status
      tags
      tasks {
        id
        status
        title
        tags
        description
      }
    }
  }
`;

const UPDATE_FEATURE = gql`
  mutation UpdateFeature($id: uuid, $set: features_set_input!) {
    update_features(where: { id: { _eq: $id } }, _set: $set) {
      affected_rows
    }
  }
`;

const FeaturePage = (): JSX.Element => {
  const router = useRouter();
  const { feature } = router.query;

  const [listItems, setListItems] = useState([] as FeatureType[]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const { data, loading, refetch } = useQuery(GET_TASKS, {
    variables: { id: feature },
    onError: (error) => {
      toast.error("Something went wrong 😭");
      console.log(error?.message);
      router.back();
    },
  });

  const [confirmFeature] = useMutation(UPDATE_FEATURE, {
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    if (data?.features) {
      setListItems(data?.features);
    }
  }, [data]);

  return (
    <div>
      <ProjectLayout title="Features">
        <div className="p-6 w-full min-h-screen md:p-8">
          <BackButton pageName="Features" />
          <div className="mt-5 flex flex-col justify-between md:flex-row">
            <div className="w-full mb-2 md:mb-0">
              <div className="flex justify-between mb-1">
                <H3>{listItems[0]?.name ?? "Loading..."}</H3>
                <div className="mr-4">
                  <UpdateFeatureDialog
                    isOpenProp={isOpen}
                    update={refetch}
                    close={() => setIsOpen(false)}
                    id={feature as string}
                    title={listItems[0]?.name}
                    description={listItems[0]?.description}
                    tags={listItems[0]?.tags}
                  />
                  <DeleteFeatureDialog
                    isOpenProp={isOpen2}
                    close={() => setIsOpen2(false)}
                    featureId={feature as string}
                  />
                  <PopoverBox
                    role="menu"
                    ButtonComponent={
                      <div>
                        <Image
                          src={MenuIconSVG}
                          alt={"feature options"}
                          height={7}
                          width={27}
                          layout={"fixed"}
                        />
                      </div>
                    }
                  >
                    <div className="m-1">
                      <div className="mb-1">
                        <ButtonWithIcon
                          onClick={() => setIsOpen(!isOpen)}
                          label={"Update Feature"}
                          image={EditIcon}
                          isHollow
                        />
                      </div>
                      <div>
                        <ButtonWithIcon
                          type={BUTTON_TYPE.DANGER}
                          onClick={() => setIsOpen2(!isOpen2)}
                          label={"Delete Feature"}
                          image={TrashIcon}
                          isHollow
                        />
                      </div>
                    </div>
                  </PopoverBox>
                </div>
              </div>
              <H6>{data?.features[0]?.description ?? ""}</H6>
            </div>
            <div className="flex">
              <div className="max-w-min">
                <ButtonWithIcon
                  isHollow={listItems[0]?.status === FEATURE_STATUS.INCOMPLETE}
                  image={
                    listItems[0]?.status === FEATURE_STATUS.INCOMPLETE
                      ? checkBlueIcon
                      : checkWhiteIcon
                  }
                  label={
                    listItems[0]?.status === FEATURE_STATUS.INCOMPLETE
                      ? "Mark as completed"
                      : "Completed"
                  }
                  onClick={() => {
                    toast.promise(
                      confirmFeature({
                        variables: {
                          id: feature,
                          set: {
                            status:
                              listItems[0]?.status === FEATURE_STATUS.INCOMPLETE
                                ? FEATURE_STATUS.COMPLETE
                                : FEATURE_STATUS.INCOMPLETE,
                          },
                        },
                      }),
                      {
                        loading: "Updating Feature...",
                        success: <b>Feature Updated!</b>,
                        error: <b>Error! Feature updation failed</b>,
                      }
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex mb-2">
              <Heading title={"Tasks"} />
            </div>
            {loading ? (
              <div className="m-auto">
                <Spinner size={2} />
              </div>
            ) : (
              <TaskList
                tasks={listItems[0]?.tasks}
                update={refetch}
                feature_id={feature as string}
              />
            )}
          </div>
        </div>
      </ProjectLayout>
    </div>
  );
};

export default FeaturePage;
