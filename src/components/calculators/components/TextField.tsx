function TextField({ label, value, onChange, suffix, width = "w-25" }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    suffix?: string,
    width?: string;
}) {
    return (
        <label className="flex flex-row justify-between items-center gap-1 min-w-0 text-sm font-medium w-full bg-gray-50 py-1 px-2 border border-gray-200 rounded-sm">
            <span>{label}</span>

            <div className="relative">
                <input
                    type="text"
                    min={0}
                    value={value}
                    onChange={(e) => {
                        const rawValue = e.target.value;
                        const parsed = rawValue === "" ? 0 : Number(rawValue);
                        onChange(Math.max(0, Math.floor(parsed)));
                    }}
                    onFocus={(e) => e.target.select()}
                    className={`border px-2 py-1 ${width} max-w-full rounded-sm ${suffix ? "pr-10" : ""}`}
                />

                {suffix && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                        {suffix}
                    </span>
                )}
            </div>
    </label>
    );
}

export default TextField;