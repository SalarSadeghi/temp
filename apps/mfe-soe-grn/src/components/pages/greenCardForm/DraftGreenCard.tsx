import { getGreenCardDrafts } from "@api/grnApi";
import { useInfiniteScroll } from "@superapp/shared-hooks";

const DraftGreenCard = () => {
  const fetchDrafts = async (pageNumber: number | null) => {
    const currentPage = pageNumber ?? 1;
    const response = await getGreenCardDrafts({
      searchParam: undefined,
      pageNumber: currentPage.toString(),
      pageSize: "20",
    });
    return {
      data: response.data,
      nextCursor: response.hasMore ? currentPage + 1 : null,
    };
  };

  const infiniteQuery = useInfiniteScroll({
    queryKey: [""],
    queryFn: fetchDrafts,
    initialPageParam: 0,
  });

  return <div></div>;
};

export default DraftGreenCard;
