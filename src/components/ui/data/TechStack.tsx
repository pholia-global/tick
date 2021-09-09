import Image from "next/image";

type StackType = {
  name: string;
  image_svg_url: string;
  type: string;
};

type TechStackProps = {
  frontendStack: StackType[];
  backendStack: StackType[];
  addFrontend: () => void;
  addBackend: () => void;
};

const TechStack = ({
  frontendStack,
  backendStack,
  addFrontend,
  addBackend,
}: TechStackProps) => {
  return (
    <div className="bg-white rounded p-7">
      <div className="font-black text-2xl mb-4">Technology Stack</div>
      <div className="flex flex-col">
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
          <div className="flex flex-col items-center mr-3">
            <button
              onClick={addFrontend}
              className="flex items-center mb-1 p-4 rounded-full border border-theme_eagle"
            >
              <Image
                src="/images/icons/add_item.png"
                alt={`Add tech icon`}
                height={24}
                width={24}
              />
            </button>
            <div className="font-light">Add</div>
          </div>
        </div>
      </div>
      <div>
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
          <div className="flex flex-col items-center mr-3">
            <button
              onClick={addBackend}
              className="flex items-center mb-1 p-4 rounded-full border border-theme_eagle"
            >
              <Image
                src="/images/icons/add_item.png"
                alt={`Add tech icon`}
                height={24}
                width={24}
              />
            </button>
            <div className="font-light">Add</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
