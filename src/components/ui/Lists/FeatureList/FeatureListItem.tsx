import Link from "next/link";
import Image from "next/image";
// Constants
import { FEATURE_STATUS } from "src/constants/enums";
// Images
import CheckImage from "@/images/icons/check-green.png";

export type FeatureListItemProps = {
  id: string;
  name: string;
  status: FEATURE_STATUS;
  project: string;
  tags: string[];
};

const FeatureListItem = ({
  id,
  name,
  status,
  project,
  tags = [],
}: FeatureListItemProps): JSX.Element => {
  return (
    <Link href={`/project/${project}/features/${id}`}>
      <a>
        <div
          className="py-4 px-5 flex bg-theme-blue border-2 border-theme-blue rounded hover:bg-white"
          role="listitem"
        >
          <div className="w-2.5 h-2.5 border-2 border-theme-eagle rotate-45"></div>
          <div className="flex flex-wrap">
            <div>{name}</div>
            {tags.map((tag, index) => (
              <div key={index}>{tag}</div>
            ))}
          </div>
          {status === FEATURE_STATUS.COMPLETE && (
            <Image
              role="image"
              src={CheckImage}
              alt="feature completed"
              width={24}
              height={24}
            />
          )}
        </div>
      </a>
    </Link>
  );
};

export default FeatureListItem;
