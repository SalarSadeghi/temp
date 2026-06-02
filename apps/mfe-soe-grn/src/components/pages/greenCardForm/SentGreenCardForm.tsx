import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Fragment } from "react/jsx-runtime";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Texts from "@assets/json/Texts.json";
import { RQKeys } from "@constants/queryKeys";
import { CloseOutlined, SearchOutlined } from "@superapp/icons";
import { useDebounce } from "@superapp/shared-hooks";

import { useGreenCardStore } from "@store/greenCardStore";
import SentCard from "./SentCard";
import { useSearchParams } from "react-router-dom";
import {
  Chip,
  IconButton,
  InputAdornment,
  Shared_Text,
  TextField,
  useMediaQuery,
  useSnackbar,
  useTheme,
} from "@superapp/ui";
import { getSentGreenCard, getSentGreencardByPrcCode } from "@api/grnApi";
import { GreenCardSentResponseDTO } from "@type/response";
import { useModalActions } from "@superapp/shared-store";
import { SentGreenCardModalID } from "./SentGreenCardModal";

const PRC_CODE = "prcCode";
const SentGreenCardForm = () => {
  const PAGE_SIZE = 5;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [searchParam, setSearchParam] = useSearchParams();
  const prcCodeParam = searchParam.get(PRC_CODE);
  const { showSnackbar } = useSnackbar();
  const { setSent } = useGreenCardStore();
  const { pushModal } = useModalActions();

  const {
    isLoading: sentGreenCardByPrcCodeLoading,
    data: sentGreenCardByPrcCodeData,
    error: sentGreenCardByPrcCodeDataError,
  } = useQuery({
    queryKey: RQKeys.getSentGreenCardByPrcCode(prcCodeParam || undefined),
    queryFn: () =>
      getSentGreencardByPrcCode({ prcCode: prcCodeParam || undefined }),
    enabled: !!prcCodeParam,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: RQKeys.getSentGreenCard(
        debouncedSearchValue.length > 2 ? debouncedSearchValue : undefined
      ),
      queryFn: async ({ pageParam = 0 }) => {
        // Use pageParam for pagination
        return await getSentGreenCard({
          pageNumber: String(pageParam),
          pageSize: String(PAGE_SIZE),
          searchParam: debouncedSearchValue || undefined,
        });
      },
      getNextPageParam: (lastPage) => {
        // Return the next page number if there are more pages
        return lastPage.hasMore ? Number(lastPage.page) + 1 : undefined;
      },
      initialPageParam: 0,
      enabled: Boolean(!prcCodeParam),
    });

  const observer = useRef<IntersectionObserver>(null);
  const lastSentRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    // if (value.length >= 3 || value.length === 0) {
    //     refetch();
    // }
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearchIcon = () => {
    if (!searchValue || searchValue.trim().length < 3) {
      showSnackbar({
        message: Shared_Text.common.searchCharactersHelp,
        severity: "warning",
      });
      return;
    }
  };

  const handleSent = (sent: GreenCardSentResponseDTO) => {
    setSent(sent);
    pushModal({ id: SentGreenCardModalID });
  };

  useEffect(() => {
    if (sentGreenCardByPrcCodeData) {
      handleSent(sentGreenCardByPrcCodeData);
    }
  }, [sentGreenCardByPrcCodeData]);

  // onError replacement
  useEffect(() => {
    if (sentGreenCardByPrcCodeDataError) {
      setSearchParam();
      // maybe show a notification
    }
  }, [sentGreenCardByPrcCodeDataError]);

  if (!!prcCodeParam && sentGreenCardByPrcCodeLoading)
    return <span>لطفا منتظر بمانید...</span>;

  return (
    <>
      <div
        className={`flex ${isDesktop ? "flex-row justify-center items-center gap-20" : "flex-col-reverse gap-4"}`}
      >
        <div className={`${isDesktop ? "w-[50%]" : "w-full"}`}>
          <TextField
            fullWidth
            label={Shared_Text.common.search}
            helperText={`${Shared_Text.common.searchInAllFields} (${Shared_Text.common.searchCharactersHelp})`}
            onChange={handleSearch}
            inputRef={searchInputRef}
            value={searchValue}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {isLoading ? (
                    <InputAdornment
                      position="start"
                      style={{ paddingLeft: theme.spacing(2) }}
                    >
                      <span>لطفا منتظر بمانید...</span>
                    </InputAdornment>
                  ) : undefined}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <InputAdornment
                    position="end"
                    style={{ paddingRight: theme.spacing(2) }}
                  >
                    <IconButton onClick={handleSearchIcon}>
                      <SearchOutlined />
                    </IconButton>
                    <IconButton onClick={handleClearSearch}>
                      <CloseOutlined />
                    </IconButton>
                  </InputAdornment>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <Chip
            label={`${Texts.greenCardForm.totalSent}: ${data?.pages[0].total ?? "-"}`}
          />
        </div>
      </div>
      {data && data.pages?.length > 0 && data.pages[0].total === 0 ? (
        <div>
          <span>موردی یافت نشد.</span>
        </div>
      ) : (
        data && (
          <div className="flex flex-col gap-4 mt-4">
            <div
              className={`flex w-full ${isDesktop ? "flex-row flex-wrap gap-4 justify-center" : "flex-col gap-4"}`}
            >
              {data?.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                  {page.data.map((sent, sentIndex) => {
                    // Attach ref to the last draft card
                    if (
                      pageIndex === data.pages.length - 1 &&
                      sentIndex === page.data.length - 1
                    ) {
                      return (
                        <div
                          onClick={() => handleSent(sent)}
                          className={`flex justify-center ${isDesktop ? "min-w-[25%]" : "w-full"}`}
                          ref={lastSentRef}
                          // key={draft.id}
                        >
                          <SentCard sent={sent} />
                        </div>
                      );
                    }
                    return (
                      <div
                        className={`flex justify-center ${isDesktop ? "min-w-[25%]" : "w-full"}`}
                        onClick={() => handleSent(sent)}
                      >
                        <SentCard sent={sent} />
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
            {isFetchingNextPage && <span>منتظر بمانید...</span>}
          </div>
        )
      )}
    </>
  );
};

export default SentGreenCardForm;
