import '../bootstrap-grid.css';
import '../style/item.css'
import Button from '@mui/material/Button';

// Three props, item, and the onclick functions
export function MainItem({
                             item,
                             addCounter,
                             removeCounter,
                             selected
                         }) {
    return (
        <div className="row item">

            <div className="col-4">
                <h2>{item.name}</h2>
                <p>Known for: {item.categories.join(", ")}</p>
                <p>Minimum monthly salary
                    required: {item.salary}</p>
                <p>Maximum months of stay: {item.length}</p>
                <p>Visa fee: {item.fee}</p>


                {!selected ? (<Button variant="contained"
                                      onClick={() => addCounter(item)}>Add
                        to your trip</Button>) :
                    (<Button variant="contained"
                             onClick={() => removeCounter(item)}>Remove</Button>)}
            </div>

            <div className="col-8">
            <img src={item.image} width="400px"></img>
            </div>

        </div>);
}