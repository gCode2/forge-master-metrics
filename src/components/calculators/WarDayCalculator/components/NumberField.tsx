function NumberField({ label, value, onChange, width = "w-25" }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    width?: string;
}) {
    return (
        <label>
            {label}
            <input
                type="number"
                min={0}
                value={value}
                onChange={(e) => onChange(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
                className={`border ml-2 px-2 ${width} rounded-sm`}
            />
        </label>
    );
}

export default NumberField;