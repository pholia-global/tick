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
          className="py-3 px-5 mb-3 flex items-center text-white bg-theme_blue border-2 border-theme_blue rounded transition-colors hover:bg-white hover:text-theme_blue"
          role="listitem"
        >
          <div className="w-2.5 h-2.5 mr-5 border-2 bg-white border-theme_eagle transform rotate-45"></div>
          <div className="flex flex-wrap items-center">
            <div className="text-lg mr-2">{name}</div>
            {tags.map((tag, index) => (
              <div
                className="mx-1 px-2 py-1 text-sm text-white rounded bg-theme_green"
                key={index}
              >
                {tag}
              </div>
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
