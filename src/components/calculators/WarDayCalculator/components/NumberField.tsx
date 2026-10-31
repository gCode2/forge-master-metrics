function NumberField({ label, value, onChange, width = "w-25" }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    width?: string;
}) {
    return (
        <label className="flex flex-row justify-between items-center gap-1 min-w-0 text-sm font-medium w-full bg-gray-50 p-1 border-1 border-gray-200">
            <span>{label}</span>

            <input
                type="number"
                min={0}
                value={value}
                onChange={(e) =>
                    onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))
                }
                className={`border px-2 py-1 ${width} max-w-full rounded-sm`}
            />
        </label>
    );
}

export default NumberField;