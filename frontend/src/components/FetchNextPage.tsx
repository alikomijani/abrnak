import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";

type FetchNextPageProps = {
  hasNextPage: boolean;
  fetch: () => void;
  children: ReactNode;
};

const FetchNextPage = ({
  hasNextPage,
  fetch,
  children,
}: FetchNextPageProps) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  useEffect(() => {
    if (hasNextPage && isIntersecting) {
      fetch();
    }
  }, [isIntersecting]);
  return <Box ref={ref}>{hasNextPage && children}</Box>;
};
export default FetchNextPage;
