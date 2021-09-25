import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
// Constants
import { STATUS } from "src/constants/enums";
// Components
import ButtonDropDown from "../DropDown/ButtonDropDown";
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
}: ProjectBasicDataProps) => {
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
      <div className="flex items-center mb-3">
        <div className="font-bold mr-2 text-4xl">{name}</div>
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
      <div className={`${!description && "hidden"} font-light text-lg`}>
        {description ?? ""}
      </div>
    </div>
  );
};

export default ProjectBasicData;
