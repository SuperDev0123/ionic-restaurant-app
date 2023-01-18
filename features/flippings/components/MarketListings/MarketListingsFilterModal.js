import React, { useState, useCallback, useEffect } from "react"
import { styled } from "@mui/system"
import {
  IconButton,
  Typography,
  TextField,
  Modal,
  Paper as MuiPaper,
  Button,
  MenuItem,
  Select,
  FormControl,
  ListItemText,
  InputLabel,
  FormHelperText,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"
import { convertPropsToArray } from "@features/tables/utils/table-data-utils"

const ModalPaper = styled(MuiPaper)`
  position: relative;
  width: 500px;
  padding: 2rem;
  max-width: 100%;
  max-height: 80vh;
  overflow: scroll;
  h2 {
    margin-bottom: 2rem;
  }
  .closeModalIcon {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
  .doneModalIcon {
    position: absolute;
    right: 4rem;
    top: 1rem;
  }
  .MuiFormControl-root {
    margin-bottom: 2rem;
  }
`

const ARRAY_TYPE_PROPS = [
  "item_type",
  "rarity",
  "series",
  "position",
  "team",
  "slot",
]

const PlayerListingsFilterModal = ({
  isOpen = false,
  onClose = () => ({}),
  columnsData: { rarity, series, teams, positions, itemTypes, slots },
  filterParams: {
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
  },
  updateDataFilters,
  dataFilters,
}) => {
  const [filters, setFilters] = useState(convertPropsToArray(dataFilters, ARRAY_TYPE_PROPS))

  useEffect(() => {
    setFilters(convertPropsToArray(dataFilters, ARRAY_TYPE_PROPS));
  }, [dataFilters])

  const handleFilterChange = useCallback(event => {
    setFilters(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }, [])

  const handleFilterSubmit = () => {
    updateDataFilters(filters);
    onClose()
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalPaper>
        <Typography component="h2" variant="h6">
          Filter Data
        </Typography>
        <IconButton
          aria-label="close"
          className="closeModalIcon"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          aria-label="submit"
          className="doneModalIcon"
          onClick={handleFilterSubmit}
        >
          <DoneIcon />
        </IconButton>
        <div className="filterFields">
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
          <FormControl fullWidth>
            <InputLabel name="item-type-label">Item Type</InputLabel>
            <Select
              name="item_type"
              labelname="item-type"
              multiple
              value={filters.item_type || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              {itemTypes.map(r => (
                <MenuItem key={r} value={r}>
                  <ListItemText primary={r} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth>
            <InputLabel name="rarity-label">Rarity</InputLabel>
            <Select
              name="rarity"
              labelname="rarity-label"
              multiple
              value={filters.rarity || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              {rarity.map(r => (
                <MenuItem key={r} value={r}>
                  <ListItemText primary={r} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel name="series-label">Series</InputLabel>
            <Select
              name="series"
              labelname="series-label"
              multiple
              value={filters.series || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              {series.map(rarity => (
                <MenuItem key={rarity} value={rarity}>
                  <ListItemText primary={rarity} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel name="item-type-label">Slot</InputLabel>
            <Select
              name="slot"
              labelname="slot"
              multiple
              value={filters.slot || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              {slots.map(r => (
                <MenuItem key={r} value={r}>
                  <ListItemText primary={r} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel name="primary-position-label">
              Primary Position
            </InputLabel>
            <Select
              name="position"
              labelname="primary-position-label"
              multiple
              value={filters.position || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              {positions.map(position => (
                <MenuItem key={position} value={position}>
                  <ListItemText primary={position} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth>
            <InputLabel name="team-label">Team</InputLabel>
            <Select
              name="team"
              labelname="team-label"
              multiple
              value={filters.team || []}
              onChange={handleFilterChange}
              renderValue={selected => selected.join(", ")}
            >
              {teams.map(team => (
                <MenuItem key={team} value={team}>
                  <ListItemText primary={team} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" onClick={handleFilterSubmit}>
          Apply Filters
        </Button>
      </ModalPaper>
    </Modal>
  )
}

export default PlayerListingsFilterModal
