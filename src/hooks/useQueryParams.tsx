import { useRouter } from "next/router";

function useQueryParams(): string {
  const router = useRouter();
  const { project } = router.query;
  return project as string;
}

export { useQueryParams };
