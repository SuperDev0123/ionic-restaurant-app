import React, { useState, useCallback, useEffect } from "react"
import {
  IconButton,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  ListItemText,
  InputLabel,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import DoneIcon from "@mui/icons-material/Done"
import ModalPaper from "@components/ModalPaper"
import { convertPropsToArray } from "@features/tables/utils/table-data-utils"

const ARRAY_TYPE_PROPS = ["division", "position", "team", "rarity", "series"];

const PlayerExchangesFilterModal = ({
  isOpen = false,
  onClose = () => ({}),
  columnsData: { rarity, teams, divisions, series },
  filterParams: { min_best_buy, max_best_buy },
  dataFilters,
  updateDataFilters,
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
    <ModalPaper isOpen={isOpen} onClose={onClose}>
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
        <FormControl fullWidth>
          <InputLabel name="division-label">Division</InputLabel>
          <Select
            name="division"
            labelname="division-label"
            multiple
            value={filters.division || []}
            onChange={handleFilterChange}
            renderValue={selected => selected.join(", ")}
          >
            {divisions.map(division => (
              <MenuItem key={division} value={division}>
                <ListItemText primary={division} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </div>
      <Button variant="contained" onClick={handleFilterSubmit}>
        Apply Filters
      </Button>
    </ModalPaper>
  )
}

export default PlayerExchangesFilterModal
