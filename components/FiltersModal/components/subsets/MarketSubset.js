import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  ListItemText,
  InputLabel,
  FormHelperText,
} from "@mui/material"
import StandardSelect from "../common/StandardSelect"

function MarketSubset({
  filters,
  filterParams,
  handleFilterChange,
  columnsData,
}) {
  const { rarity, series, teams, positions, itemTypes, slots } = columnsData;
  const {
    best_buy,
    min_best_buy,
    max_best_buy,
    best_sell,
    min_best_sell,
    max_best_sell,
    profit,
    min_profit,
    max_profit,
    profit_percentage,
    min_profit_percentage,
    max_profit_percentage,
    sales_minute,
    profit_minute,
    min_profit_minute,
    max_profit_minute,
  } = filterParams;

  return (
    <>
      <TextField
        name="search"
        fullWidth
        value={filters.search ?? ""}
        onChange={handleFilterChange}
        label="Search by Item Name"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <StandardSelect
        label="Item Type"
        name="item_type"
        value={filters.item_type}
        onChange={handleFilterChange}
        options={itemTypes}
      />
      <TextField
        name="min_overall"
        style={{ width: "50%" }}
        value={filters.min_overall ?? ""}
        onChange={handleFilterChange}
        label="Minimum Overall"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="max_overall"
        style={{ width: "50%" }}
        value={filters.max_overall ?? ""}
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
        label="Slot"
        name="slot"
        value={filters.slot}
        onChange={handleFilterChange}
        options={slots}
      />
      <StandardSelect
        label="Primary Position"
        name="position"
        value={filters.position}
        onChange={handleFilterChange}
        options={positions}
      />
      <FormControl fullWidth>
        <InputLabel name="primary-position-label">
          Close to Quick Sell?
        </InputLabel>
        <Select
          name="close_to_quick_sell"
          labelname="close-to-quick-sell-label"
          value={filters.close_to_quick_sell || []}
          onChange={handleFilterChange}
        >
          <MenuItem key="yes" value="True">
            <ListItemText primary="Yes" />
          </MenuItem>
          <MenuItem key="no" value="False">
            <ListItemText primary="No" />
          </MenuItem>
          <MenuItem key="null" value="All">
            <ListItemText primary="All" />
          </MenuItem>
        </Select>
        <FormHelperText>
          Only show cards within 5% of quick sell value. These are great for
          passive, low-risk flipping.
        </FormHelperText>
      </FormControl>
      <TextField
        name={min_best_buy}
        style={{ width: "50%" }}
        value={filters[min_best_buy] ?? ""}
        onChange={handleFilterChange}
        label="Minimum Buy"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={max_best_buy}
        style={{ width: "50%" }}
        value={filters[max_best_buy] ?? ""}
        onChange={handleFilterChange}
        label="Maximum Buy"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={min_best_sell}
        style={{ width: "50%" }}
        value={filters[min_best_sell] ?? ""}
        onChange={handleFilterChange}
        label="Minimum Sell"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={max_best_sell}
        style={{ width: "50%" }}
        value={filters[max_best_sell] ?? ""}
        onChange={handleFilterChange}
        label="Maximum Sell"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={min_profit}
        style={{ width: "50%" }}
        value={filters[min_profit] ?? ""}
        onChange={handleFilterChange}
        label="Minimum Profit"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={max_profit}
        style={{ width: "50%" }}
        value={filters[max_profit] ?? ""}
        onChange={handleFilterChange}
        label="Maximum Profit"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={min_profit_percentage}
        style={{ width: "50%" }}
        value={filters[min_profit_percentage] ?? ""}
        onChange={handleFilterChange}
        label="Minimum Profit %"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={max_profit_percentage}
        style={{ width: "50%" }}
        value={filters[max_profit_percentage] ?? ""}
        onChange={handleFilterChange}
        label="Maximum Profit %"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="min_sales_minute"
        style={{ width: "50%" }}
        value={filters.min_sales_minute ?? ""}
        onChange={handleFilterChange}
        label="Minimum Sales/Minute"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="max_sales_minute"
        style={{ width: "50%" }}
        value={filters.max_sales_minute ?? ""}
        onChange={handleFilterChange}
        label="Maximum Sales/Minute"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={min_profit_minute}
        style={{ width: "50%" }}
        value={filters[min_profit_minute] ?? ""}
        onChange={handleFilterChange}
        label="Minimum Profit/Minute"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name={max_profit_minute}
        style={{ width: "50%" }}
        value={filters[max_profit_minute] ?? ""}
        onChange={handleFilterChange}
        label="Maximum Profit/Minute"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <StandardSelect
        label="Team"
        name="team"
        value={filters.team}
        onChange={handleFilterChange}
        options={teams}
      />
    </>
  )
}

export default MarketSubset
