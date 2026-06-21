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
import { Fragment, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Texts from "@assets/json/Texts.json";
import { CloseOutlined, SearchOutlined } from "@superapp/icons";
import DraftCard from "./DraftCard";
import { useGreenCardStore } from "@store/soe/grn/greenCardStore";
import { getGRNDrafts } from "@api/soe/grn";
import { GRNDraftResponseDTO } from "@api/soe/grn/types/response";
import { NavigationState } from "@api/soe/grn/types/request";
import { GRNKeys } from "@constants/RQKeys/soe/grn";
import { useDebounce } from "@superapp/shared-hooks";

const DraftGreenCardForm = () => {
  const PAGE_SIZE = 10;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const { changeMode, setDraft } = useGreenCardStore();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { showSnackbar } = useSnackbar();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: GRNKeys.getGRNDrafts(
        debouncedSearchValue?.length > 2 ? debouncedSearchValue : undefined
      ),
      queryFn: async ({ pageParam = 0 }) => {
        return await getGRNDrafts({
          search: debouncedSearchValue || undefined,
          page: pageParam,
          size: PAGE_SIZE,
        });
      },
      getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? Number(lastPage.page) + 1 : undefined;
      },
      initialPageParam: 0,
    });

  const observer = useRef<IntersectionObserver>(null);
  const lastDraftRef = useCallback(
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

  const handleDraft = (draft: GRNDraftResponseDTO) => {
    if (draft?.lock) {
      showSnackbar({
        message: Texts.features.soe.grn.lockDraftMSG,
        severity: "info",
      });
      return;
    }
    const state: NavigationState = {
      fromPage: "draft",
    };
    setDraft(draft);
    changeMode("edit");
    navigate("/greenCard/register", { state });
  };

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
      return;
    }
  };
  return (
    <>
      <div
        className={`flex p-4 ${isDesktop ? "flex-row justify-center items-center gap-20" : "flex-col-reverse gap-4"}`}
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
            label={`${Texts.features.soe.grn.totalDraft} ${data?.pages[0].total ?? "-"}`}
          />
        </div>
      </div>
      {data && data.pages?.length > 0 && data.pages[0].total === 0 ? (
        <div>
          <span>داده‌ای یافت نشد</span>
        </div>
      ) : (
        data && (
          <div className="flex flex-col gap-4 mt-4">
            <div
              className={`flex w-full ${isDesktop ? "flex-row flex-wrap gap-4 justify-center" : "flex-col gap-4"}`}
            >
              {data?.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                  {page.data.map((draft, draftIndex) => {
                    // Attach ref to the last draft card
                    if (
                      pageIndex === data.pages.length - 1 &&
                      draftIndex === page.data.length - 1
                    ) {
                      return (
                        <div
                          onClick={() => handleDraft(draft)}
                          className={`flex justify-center ${isDesktop ? "min-w-[25%]" : "w-full"}`}
                          ref={lastDraftRef}
                          key={draft.id}
                        >
                          <DraftCard draft={draft} />
                        </div>
                      );
                    }
                    return (
                      <div
                        className={`flex justify-center ${isDesktop ? "min-w-[25%]" : "w-full"}`}
                        onClick={() => handleDraft(draft)}
                      >
                        <DraftCard key={draft.id} draft={draft} />
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

export default DraftGreenCardForm;
