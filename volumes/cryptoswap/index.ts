const {
  getChainVolume,
  DEFAULT_TOTAL_VOLUME_FIELD,
  DEFAULT_DAILY_VOLUME_FIELD,
} = require("../../helper/getUniSubgraphVolume");
const { BSC } = require("../../helper/chains");
const { getStartTimestamp } = require("../../helper/getStartTimestamp");

import { SimpleAdapter } from "../../adapter.type";

const endpoints = {
  [BSC]: "https://api.thegraph.com/subgraphs/name/cr3k/cdsexchange",
};

const DAILY_VOLUME_FACTORY = "CSTDayData";

const graphs = getChainVolume({
  graphUrls: {
    [BSC]: endpoints[BSC],
  },
  totalVolume: {
    factory: "CSTFactory",
    field: DEFAULT_TOTAL_VOLUME_FIELD,
  },
  dailyVolume: {
    factory: DAILY_VOLUME_FACTORY,
    field: DEFAULT_DAILY_VOLUME_FIELD,
  },
});

const adapter: SimpleAdapter = {
  volume: {
    [BSC]: {
      fetch: graphs(BSC),
      start: getStartTimestamp({
        endpoints,
        chain: BSC,
        dailyDataField: `${DAILY_VOLUME_FACTORY}s`,
      }),
    },
  },
};

export default adapter;
