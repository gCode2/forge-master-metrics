function AscendCalculator(){
    return (
        <>
            <div className="flex flex-col gap-1 w-full">
                <div className="flex flex-row justify-start items-center gap-5 w-full">
                    <div className="h-16 w-16 sm:h-25 sm:w-25 shrink-0">
                        <img src="/icons/ascend.png" className="h-16 w-16 sm:h-25 sm:w-25 shrink-0"/>
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold">
                            Ascend Calculator
                        </div>
                        <div className="text-sm text-zinc-500">
                            Find out how much you need to upgrade and what resources are required for your next ascension.
                        </div>
                    </div>
                </div>
                <div className="mt-6 w-full">
                    <section className="flex flex-col gap-4 sm:gap-5 text-sm min-w-0 w-full">
                        <div className="border-2 rounded-md p-3 flex flex-col gap-4 shadow-lg/20">
                            <label className="flex flex-row gap-1 font-medium justify-between items-center font-medium w-full bg-gray-50 p-1 border-1 border-gray-200">
                                Select a resource
                                <select
                                    value={0}
                                    onChange={(e) => {
                                    // setCalculatorState(prev => ({
                                    //     ...prev,
                                    //     selectedForgeLevel: Number(e.target.value),
                                    // }));
                                    }
                                    }
                                    className="border rounded-sm px-2 py-1 bg-white"
                                                                        >
                                    {/* {forgeLevels.map((level) => (
                                        <option key={level.level} value={level.level}>
                                        Level {level.level}
                                        </option>
                                    ))} */}
                                </select>
                            </label>

                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default AscendCalculator;