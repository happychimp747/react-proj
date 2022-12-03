export function Aggregator({
                               itemsString,
                               features,
                               minSalary,
                               total
                           }) {
    return (<div>
        <h4>Locations in your trip</h4>
        {/* TODO: render a list of items in the cart */}
        <p>Locations: {
            itemsString
        }</p>
        <p>Features
            included: {features}</p>
        <p>Mnimum monthly
            salary of the trip: {minSalary}</p>
        <p>Total visa
            cost: {total}</p>
    </div>)


}
