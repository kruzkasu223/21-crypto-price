import { type NextPage } from "next"
import Head from "next/head"
import { useCallback, useMemo, useState } from "react"
import { SelectInput } from "~/components"
import { Loading } from "~/components/Loading"
import { COINS, VS_COINS } from "~/data"
import type { onChangeType } from "~/types"
import { useFetch } from "~/useFetch"

const API_URL = "https://api.coingecko.com/api/v3/simple/price"

const getApiUrl = (coin: string, vsCoin: string) => {
  return `${API_URL}?include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=8&ids=${coin}&vs_currencies=${vsCoin}`
}

const Home: NextPage = () => {
  const [currenciesSetting, setCurrenciesSetting] = useState({
    fromCurrency: "bitcoin",
    toCurrency: "usd",
  })

  const { loading, value, error } = useFetch(
    getApiUrl(currenciesSetting.fromCurrency, currenciesSetting.toCurrency)
  )

  const coinPrice: unknown = useMemo(() => {
    if (
      !currenciesSetting?.fromCurrency ||
      !currenciesSetting.toCurrency ||
      !value
    )
      return undefined

    return value?.[currenciesSetting.fromCurrency as keyof unknown]
  }, [value, currenciesSetting])

  const onChange: onChangeType = (name, value) => {
    setCurrenciesSetting((settings) => ({
      ...settings,
      [name]: value,
    }))
  }

  const getStatsData = useCallback(
    (key: string) => {
      return Number(
        coinPrice?.[
          `${currenciesSetting.toCurrency}${key}` as keyof typeof coinPrice
        ]
      )
    },
    [coinPrice, currenciesSetting.toCurrency]
  )

  const formattedPrice = useCallback(
    (value: string | number, minimumFractionDigits: number) => {
      try {
        return Intl.NumberFormat(
          currenciesSetting.toCurrency === "inr" ? "en-IN" : undefined,
          {
            style: "currency",
            currency: currenciesSetting.toCurrency,
            minimumFractionDigits,
          }
        ).format(Number(value))
      } catch {
        return String(value)
      }
    },
    [currenciesSetting.toCurrency]
  )

  return (
    <>
      <Head>
        <title>21/27 - Crypto Price</title>
      </Head>
      <main
        data-theme="cyberpunk"
        className="flex min-h-screen flex-col items-center gap-4"
      >
        <h1 className="m-6 text-4xl font-extrabold tracking-tight">
          21/27 - Crypto Price
        </h1>
        <Loading loading={loading} />
        <div className="flex flex-col gap-8">
          <>
            {!loading && error && (
              <div className="flex flex-col items-center">
                <div className="alert alert-error shadow-lg">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 flex-shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold">
                        Error! Something went wrong...
                      </h3>
                      <div className="text-xs">
                        message: Hmmm, Can&apos;t seem to find what went
                        wrong...🤔
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-14">
              <SelectInput
                name="fromCurrency"
                fromORto="from"
                options={COINS}
                onSelect={onChange}
                value={currenciesSetting.fromCurrency}
              />
              <SelectInput
                name="toCurrency"
                fromORto="to"
                options={VS_COINS}
                onSelect={onChange}
                value={currenciesSetting.toCurrency}
              />
            </div>

            {coinPrice && (
              <div>
                <div className="card bg-primary text-primary-content">
                  <div className="card-body">
                    <div className="badge mb-2 uppercase">
                      {
                        COINS.find(
                          (coin) => coin.id === currenciesSetting.fromCurrency
                        )?.name
                      }
                      {" to "}
                      {
                        VS_COINS.find(
                          (coin) => coin.id === currenciesSetting.toCurrency
                        )?.name
                      }
                    </div>
                    <h2 className="card-title text-6xl uppercase">
                      {formattedPrice(getStatsData(""), 8) || 0}
                    </h2>

                    <div className="mt-2 flex flex-col items-center gap-10 text-center">
                      <div className="stats uppercase  shadow">
                        <div className="stat place-items-center">
                          <div className="stat-title">24H Change</div>
                          <div className="stat-value text-2xl">
                            {getStatsData("_24h_change")?.toFixed(4) || 0}%
                          </div>
                        </div>
                        <div className="stat place-items-center">
                          <div className="stat-title">24H Volume</div>
                          <div className="stat-value text-2xl">
                            {formattedPrice(getStatsData("_24h_vol"), 2) || 0}
                          </div>
                        </div>
                        <div className="stat place-items-center">
                          <div className="stat-title">Market Cap</div>
                          <div className="stat-value text-2xl">
                            {formattedPrice(getStatsData("_market_cap"), 2) ||
                              0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </main>
    </>
  )
}

export default Home
