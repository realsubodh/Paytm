export const Balance = ({ value }) => {
    return <div className="flex">
        <div className="font-semibold text-lg">
            Your balance is :
        </div>
        <div className="font-md ml-4 text-lg">
            Rs {value}
        </div>
    </div>
}