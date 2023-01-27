import { FiltersSubsetUtil } from "../utils/FiltersSubsetUtil";
import PlayersSubset from "./subsets/PlayersSubset";
import ExchangeSubset from "./subsets/ExchangeSubset";
import MarketSubset from "./subsets/MarketSubset";

function FiltersSubset(params) {
  const { subset } = params;

  if (subset === FiltersSubsetUtil.PLAYERS) {
    return (<PlayersSubset {...params} />)
  }

  if (subset === FiltersSubsetUtil.EXCHANGE) {
    return (<ExchangeSubset {...params} />)
  }

  if (subset === FiltersSubsetUtil.MARKET) {
    return (<MarketSubset {...params} />)
  }

  return null;
}

export default FiltersSubset;
