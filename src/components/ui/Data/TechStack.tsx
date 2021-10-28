import Image from "next/image";
// Components
import AddStackDialog from "@/components/ui/Dialog/AddStackDialog/AddStackDialog";
import { H4 } from "@/components/ui/Typography";

export type StackType = {
  id: string;
  name: string;
  image_svg_url: string;
  type: string;
};

type TechStackProps = {
  frontendStack: StackType[];
  backendStack: StackType[];
  project: string;
  update: () => void;
};

const TechStack = ({
  frontendStack,
  backendStack,
  project,
  update,
}: TechStackProps): JSX.Element => {
  return (
    <div className="bg-white rounded p-7">
      <div className="mb-4">
        <H4>Technology Stack</H4>
      </div>
      <div className="flex flex-col" data-testid="frontend">
        <div className="text-lg mb-2">Frontend</div>
        <div className="mb-2 flex flex-wrap">
          {frontendStack.map((fStack, index) => {
            return (
              <div className="flex flex-col items-center mr-3 mb-1" key={index}>
                <div className="flex items-center mb-1 p-4 rounded-full border border-theme_eagle">
                  <Image
                    src={fStack.image_svg_url}
                    alt={`${fStack.name} icon`}
                    height={24}
                    width={24}
                  />
                </div>
                <div className="font-light">{fStack.name}</div>
              </div>
            );
          })}
          <AddStackDialog
            type="frontend"
            stack={frontendStack}
            project={project}
            update={update}
          />
        </div>
      </div>
      <div data-testid="backend">
        <div className="text-lg mb-2">Backend</div>
        <div className="mb-2 flex flex-wrap">
          {backendStack.map((bStack, index) => {
            return (
              <div className="flex flex-col items-center mb-1 mr-3" key={index}>
                <div className="flex items-center p-4 rounded-full border border-theme_eagle">
                  <Image
                    src={bStack.image_svg_url}
                    alt={`${bStack.name} icon`}
                    height={24}
                    width={24}
                  />
                </div>
                <div className="font-light">{bStack.name}</div>
              </div>
            );
          })}
          <AddStackDialog
            type="backend"
            stack={backendStack}
            project={project}
            update={update}
          />
        </div>
      </div>
    </div>
  );
};

export default TechStack;
