import { useMemo } from "react"
import useAuth from "@useAuth"
import tableDefinitions from "../table-definitions"

const useTableDefinition = tableName => {
  const { currentUserIsGoldPlus } = useAuth()
  const { columnsData, findFilterParams, findColumns } = useMemo(
    () => tableDefinitions[tableName],
    [tableName]
  )

  const filterParams = useMemo(
    () => findFilterParams(currentUserIsGoldPlus),
    [currentUserIsGoldPlus]
  )

  const columns = useMemo(() => findColumns(filterParams), [filterParams])
  return { filterParams, columns, columnsData }
}

export default useTableDefinition
