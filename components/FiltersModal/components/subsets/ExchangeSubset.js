import { TextField } from "@mui/material"
import StandardSelect from "../common/StandardSelect"

function ExchangeSubset({
  filters,
  filterParams,
  handleFilterChange,
  columnsData,
}) {
  const { rarity, teams, divisions, series } = columnsData;
  const { min_best_buy, max_best_buy } = filterParams;

  return (
    <>
      <TextField
        name="search"
        fullWidth
        value={filters.search}
        onChange={handleFilterChange}
        label="Search by Player Name"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="min_overall"
        style={{ width: "50%" }}
        value={filters.min_overall}
        onChange={handleFilterChange}
        label="Minimum Overall"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="max_overall"
        style={{ width: "50%" }}
        value={filters.max_overall}
        onChange={handleFilterChange}
        label="Maximum Overall"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <StandardSelect
        label="Rarity"
        name="rarity"
        value={filters.rarity}
        onChange={handleFilterChange}
        options={rarity}
      />
      <StandardSelect
        label="Series"
        name="series"
        value={filters.series}
        onChange={handleFilterChange}
        options={series}
      />
      <StandardSelect
        label="Team"
        name="team"
        value={filters.team}
        onChange={handleFilterChange}
        options={teams}
      />
      <StandardSelect
        label="Division"
        name="division"
        value={filters.division}
        onChange={handleFilterChange}
        options={divisions}
      />
      <TextField
        name={min_best_buy}
        style={{ width: "50%" }}
        value={filters[min_best_buy]}
        onChange={handleFilterChange}
        label="Minimum Buy"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={max_best_buy}
        style={{ width: "50%" }}
        value={filters[max_best_buy]}
        onChange={handleFilterChange}
        label="Maximum Buy"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="min_exchange_value"
        style={{ width: "50%" }}
        value={filters.min_exchange_value}
        onChange={handleFilterChange}
        label="Minimum Exchange Value"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="max_exchange_value"
        style={{ width: "50%" }}
        value={filters.max_exchange_value}
        onChange={handleFilterChange}
        label="Maximum Exchange Value"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="min_cost_per_point"
        style={{ width: "50%" }}
        value={filters.min_cost_per_point}
        onChange={handleFilterChange}
        label="Minimum Cost Per Point"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="max_cost_per_point"
        style={{ width: "50%" }}
        value={filters.max_cost_per_point}
        onChange={handleFilterChange}
        label="Maximum Cost Per Point"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  )
}

export default ExchangeSubset
