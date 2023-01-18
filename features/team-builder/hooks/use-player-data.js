import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then(res => res.json())

const usePlayerData = cardId => {
  const { data, error } = useSWR(
    cardId
      ? `https://api.showzone.io/api/player-profiles/${cardId}`
      : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    playerData: data,
    isLoading: !error && !data,
    error: error,
  }
}

export default usePlayerData
