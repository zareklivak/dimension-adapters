import fetchURL from "../utils/fetchURL"
import { FetchResultFees, SimpleAdapter } from "../adapters/types";
import { CHAIN } from "../helpers/chains";

const url_arb="https://dapi.api.arbitrum-prod.firefly.exchange/marketData/fees"
const url_sui="https://dapi.api.sui-prod.bluefin.io/marketData/fees"

const fetch_arb = async (timestamp: number): Promise<FetchResultFees> => {
   const result= await fetchURL(url_arb);
    const dailyFees=result.data.last24HoursFees;
    const totalFees=result.data.totalFees;

  return {
    dailyFees: dailyFees ? `${dailyFees}` : undefined,
    totalFees: totalFees ? `${totalFees}` : undefined,
    timestamp: timestamp,
  };
};


const fetch_sui = async (timestamp: number): Promise<FetchResultFees> => {
    const result= await fetchURL(url_sui);
    const dailyFees=result.data.last24HoursFees;
    const totalFees=result.data.totalFees;

  return {
    dailyFees: dailyFees ? `${dailyFees}` : undefined,
    totalFees: totalFees ? `${totalFees}` : undefined,
    timestamp: timestamp,
  };
};

const adapter: SimpleAdapter = {
  adapter: {
    [CHAIN.ARBITRUM]: {
      fetch: fetch_arb,
      start: async () => 1700265600,
      runAtCurrTime: true,
    },
    [CHAIN.SUI]: {
        fetch: fetch_sui,
        start: async () => 1700265600,
        runAtCurrTime: true,
      },
  },
};

export default adapter;
