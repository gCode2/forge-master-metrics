function NumberField({ label, value, onChange, width = "w-25" }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    width?: string;
}) {
    return (
        <label className="flex flex-row justify-between items-center gap-1 min-w-0 text-sm font-medium w-full bg-gray-50 py-1 px-2 border-1 border-gray-200 rounded-sm">
            <span>{label}</span>

            <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => {
                    const rawValue = e.target.value;
                    console.log(rawValue)
                    const parsed = rawValue === "" ? 0 : Number(rawValue);
                    onChange(Math.max(0, Math.floor(parsed)));
                }}
                onFocus={(e) => e.target.select()}
                className={`border px-2 py-1 ${width} max-w-full rounded-sm`}
            />
        </label>
    );
}

export default NumberField;