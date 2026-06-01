import { getGreenCardDrafts } from "@api/grnApi";
import { RQKeys } from "@constants/queryKeys";
import {
  useInfiniteScroll,
  useIntersectionObserver,
} from "@superapp/shared-hooks";
import { GreenCardDraftResponseDTO } from "@type/response";
import { useCallback } from "react";

const DraftGreenCard = () => {
  // Adapter function to transform your API to the expected shape
  const fetchDrafts = useCallback(async (pageNumber: number | null) => {
    const currentPage = pageNumber ?? 1;
    const response = await getGreenCardDrafts({
      searchParam: undefined,
      pageNumber: currentPage.toString(),
      pageSize: "10",
    });

    return {
      data: response.data,
      nextCursor: response.hasMore ? currentPage + 1 : null,
    };
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteScroll({
      queryKey: RQKeys.getGreenCardDrafts(),
      queryFn: fetchDrafts,
      initialPageParam: 0,
    });
  const allDrafts =
    (data as any)?.pages.flatMap((page: any) => page.data) ?? [];

  const loadMoreRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, hasNextPage && !isFetchingNextPage);
  return (
    <div className="flex flex-col gap-4">
      {allDrafts?.map((draft: GreenCardDraftResponseDTO) => (
        <div className="h-500 bg-blue-200" key={draft.id}>
          {}
        </div>
      ))}
      <div ref={loadMoreRef}>Loading</div>
    </div>
  );
};

export default DraftGreenCard;
