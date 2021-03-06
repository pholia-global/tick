import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
// Constants
import { PROJECT_STATUS as STATUS } from "src/constants/enums";
// Components
import ButtonDropDown from "../DropDown/ButtonDropDown";
import { H2, H6 } from "../Typography";
// Queries
const UPDATE_STATUS = gql`
  mutation UpdateStatus($id: uuid!, $status: Int!) {
    update_projects(where: { id: { _eq: $id } }, _set: { status: $status }) {
      affected_rows
    }
  }
`;
// Types
type ProjectBasicDataProps = {
  id: string;
  name: string;
  status: STATUS;
  description?: string;
};

const ProjectBasicData = ({
  id,
  name,
  status,
  description,
}: ProjectBasicDataProps): JSX.Element => {
  const [pStatus, setPStatus] = useState(status);

  const [updateStatus] = useMutation(UPDATE_STATUS);

  const handleStatusSelection = (selection: string) => {
    setPStatus(selection as unknown as STATUS);
    updateStatus({
      variables: { id: id, status: parseInt(selection) },
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center mb-3">
        <div className="mr-2">
          <H2>{name}</H2>
        </div>
        <div className="ml-4">
          <ButtonDropDown
            buttonLabel={
              pStatus === STATUS.ACTIVE
                ? "active"
                : pStatus === STATUS.INACTIVE
                ? "inactive"
                : "dead"
            }
            options={[
              {
                value: STATUS.ACTIVE,
                label: "active",
              },
              {
                value: STATUS.INACTIVE,
                label: "inactive",
              },
              {
                value: STATUS.DEAD,
                label: "dead",
              },
            ]}
            buttonClassName={`${
              pStatus === STATUS.ACTIVE
                ? "bg-green-600"
                : pStatus === STATUS.INACTIVE
                ? "bg-yellow-500"
                : "bg-red-600"
            } px-6 py-0.5 text-white rounded`}
            callback={handleStatusSelection}
          />
        </div>
      </div>
      <H6 className={`${!description && "hidden"}`}>{description ?? ""}</H6>
    </div>
  );
};

export default ProjectBasicData;
