function CalculatorsPage () {
    return (
        <>
        <main className="flex flex-1 w-full p-6">
            <div className="flex flex-1 flex-col gap-2 w-full">
                <div className="flex flex-row gap-3 items-center border-2 rounded w-full h-23 shadow-lg/20 px-6">
                    <div>
                        <img src="/icons/calculator.png" className="h-16 w-16"/>
                    </div>
                    <div className="flex flex-col gap-1 justify-center items-start">
                        <div>
                            <span className="text-4xl font-black">
                                Calculators
                            </span>
                        </div>
                        <div className="ml-1 text-sm">
                            Useful tools to help you plan, calculate and optimize your progress in Forge Master.
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}
export default CalculatorsPage;