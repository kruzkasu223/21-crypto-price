import type { CoinType, onChangeType } from "../types"

export type SelectInputProps = {
  options: CoinType[]
  onSelect: onChangeType
  name: string
  value: string
  fromORto: "from" | "to"
}

export const SelectInput = ({
  options,
  onSelect,
  name,
  value,
  fromORto,
}: SelectInputProps) => {
  return (
    <div className="form-control w-full max-w-md">
      <label className="label">
        <span className="label-text">
          Pick the currency you want to convert {fromORto}
        </span>
      </label>
      <select
        className="select-accent select font-mono text-xl uppercase"
        onChange={(e) => {
          onSelect(e.target.name, e.target.value)
        }}
        name={name}
        value={value}
      >
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.symbol} - {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
