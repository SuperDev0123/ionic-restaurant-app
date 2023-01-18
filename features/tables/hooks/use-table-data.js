import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { convertArraysToString, fetchData, removeEmptyProperties } from "../utils/table-data-utils";

function useTableData(API_URL, defaultFilters = {}) {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if(router.isReady) {
      const { query } = router;
      updateDataFilters({ ...defaultFilters, ...query }, false);
    }
  }, [router.isReady]);

  /* this function will add new filters and update existing ones */
  function updateDataFilters(filtersParam, shouldUpdateURI = true) {
    setFilters(prevState => {
      const updatedFilters = removeEmptyProperties({ ...prevState, ...filtersParam });

      // if the page is not explicitly set, reset it when the filters are updated
      if (filtersParam.page === undefined) delete updatedFilters.page;

      updateData(updatedFilters);
      if(shouldUpdateURI) updateURI(updatedFilters);

      return updatedFilters;
    });
  }

  /* this function will refresh the data without changing any filters */
  function refreshData() {
    updateData(filters);
  }

  function updateURI(queryObj) {
    const convertedQueryObj = convertArraysToString(queryObj);
      
    const obj = {
      pathname: router.pathname,
      query: convertedQueryObj,
    }
    router.push(obj, undefined, {shallow: true});
  }

  async function updateData(filtersParam) {
    setIsLoading(true);

    try {
      const { results, count } = await fetchData(API_URL, filtersParam);

      setData(results);
      setCount(count);
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false);
  }

  const page = filters.page ?? 1;

  return {
    data,
    count,
    page,
    initialDataFilters: filters,
    dataFilters: filters,
    isLoading,
    updateDataFilters,
    refreshData,
  }
}

export default useTableData;