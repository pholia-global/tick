import Link from "next/link";

const CreateProjectCard = () => {
  return (
    <Link href="/projects/new">
      <a>
        <div className="w-80 h-52 flex flex-col items-center justify-center font-light text-black-sixty_op text-8xl rounded-md bg-white border-4 border-dashed border-theme_dawn_pink md:h-full">
          +
        </div>
      </a>
    </Link>
  );
};

export default CreateProjectCard;
