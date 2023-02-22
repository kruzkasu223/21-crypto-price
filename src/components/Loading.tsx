export const Loading = ({ loading = false }) => {
  return loading ? (
    <div className="fixed inset-0 z-50 grid items-center bg-transparent backdrop-blur-sm">
      <div className="mt-10 flex flex-col items-center">
        <progress className="progress w-56"></progress>
        <p className="m-2 text-xl">Loading...</p>
        <progress className="progress w-56"></progress>
      </div>
    </div>
  ) : (
    <></>
  )
}
