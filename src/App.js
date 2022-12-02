// TODO: default sorting button

import logo from './logo.svg';
import './style/App.css';
import './bootstrap-grid.css'
import {useState} from "react";
import {MainItem} from "./components/MainItem.jsx";
import mainData from "./assets/main-data.json";
import filteringData from "./assets/filtering-data.json";
import sortingData from "./assets/sorting-data.json"
import {
    Checkbox,
    FormGroup,
    FormControlLabel, Radio, RadioGroup
} from "@mui/material";
import {Aggregator} from "./components/Aggregator";


/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
mainData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});

/* ############################################################## */

function App() {
    // The aggregator
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(
        new Array(mainData.length).fill(false)
    );

    // Category selection
    const [checkedCats, setCheckedCats] = useState(
        new Array(filteringData.length).fill(false)
    );

    // Sorting and items shown
    const [sortKey, setSortKey] = useState("id");
    const [filteredItems, setFilteredItems] = useState(mainData.slice());

    // Deprecated
    const [selectedTotal, setSelectedTotal] = useState(0);

    function sortItems(key) {

        if (key) {
            var newFilteredItems = filteredItems.slice();
            if (key == 'length') {
                newFilteredItems.sort((a, b) => b[key] - a[key]);

            } else {
                newFilteredItems.sort((a, b) => {
                    return a[key] - b[key];
                });
            }
            setFilteredItems(newFilteredItems);
        }
    }

    function handleSorting(event) {
        setSortKey(event.target.value);
        sortItems(event.target.value);
    }

    function handleFiltering(event) {
        // "AND" based filtering
        if (event.target.checked) {
            if (event.target.value === "all") {

                setFilteredItems(mainData);
            } else {
                setFilteredItems(filteredItems.filter(item => (item.categories.includes(event.target.value))));
            }
            setCheckedCats(checkedCats.map((ele, index) => filteringData[index].value === event.target.value ? true : ele));
        } else {
            var newCheckedCats = checkedCats.map((ele, index) => filteringData[index].value === event.target.value ? false : ele);

            var newMainData = mainData.slice();
            // Uncheck is trickier, you need to apply checked filters in sequence
            if (sortKey) {
                if (sortKey == 'length') {
                    newMainData.sort((a, b) => b[sortKey] - a[sortKey]);

                } else {
                    newMainData.sort((a, b) => a[sortKey] - b[sortKey]);
                }
            }

            for (let catId in filteringData) {
                var cat = filteringData[catId];
                if (newCheckedCats[catId] === true) {
                    newMainData = newMainData.filter(item => (item.categories.includes(cat.value)));
                }
            }
            setFilteredItems(newMainData);
            setCheckedCats(newCheckedCats);
        }
    };

    function produceSelectedItemsString() {
        var names = [];
        for (const item of selectedItems) {
            names.push(item.name);
        }
        return names.length === 0 ? "None added" : names.join(", ");
    }

    function produceMinSalary() {
        var res = 0;
        for (const item of selectedItems) {
            res = res < item.salary ? item.salary : res;
        }
        return selectedItems.length === 0 ? "None added" : res;
    }

    function produceFeatures() {
        var features = [];
        for (const item of selectedItems) {
            for (const cat of item.categories) {
                if (!features.includes(cat)) {
                    features.push(cat);
                }
            }
        }
        features.sort();
        return features.length === 0 ? "None added" : features.join(", ");
    }

    function produceSelectedTotal() {
        var fees = [];
        var total = 0;
        for (const item of selectedItems) {
            fees.push(item.fee);
            total += item.fee
        }
        return fees.length === 0 ? "None added" : total;
    }

    function handleAddClick(item) {
        setSelectedTotal(selectedTotal + item.fee);
        setSelectedItems(selectedItems.concat(item));

        setSelectedStatus(selectedStatus.map((ele, index) => index === item.id ? true : ele));
    }

    function handleRemoveClick(item) {
        setSelectedStatus(selectedStatus.map((ele, index) => index === item.id ? false : ele));

        var itemPosition = null;
        for (var i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i].name == item.name) {
                itemPosition = i;
            }
        }

        if (itemPosition !== null) {
            setSelectedTotal(selectedTotal - item.fee);
            setSelectedItems(selectedItems.filter((_, index) => index !== itemPosition));
        }
    }

    return (
        <div className="App container">
            <div className="App-header">
                <h1>Nomading Destinations</h1>

                <p>Explore your next
                    workation abroad, on digital nomad
                    visas</p>
            </div>

            <div className="row">

                <div className="sidebar col-3">
                    <div>
                        <h4>Country features </h4>
                        <FormGroup>{filteringData.map((item, index) =>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={handleFiltering}
                                    value={item.value}
                                    id={item.id}
                                    sx={{my: 0.7}}
                                />}
                                label={item.name}
                                key={item.name}/>)}
                        </FormGroup>
                    </div>

                    <div>
                        <h4>Sort by</h4>
                        <RadioGroup
                            value={sortKey}
                            onChange={handleSorting}
                        >{sortingData.map(item =>
                            <FormControlLabel
                                value={item.value}
                                control={<Radio/>}
                                label={item.name}
                                sx={{my: 0.5}}/>
                        )}
                        </RadioGroup>
                    </div>

                    <Aggregator itemsString={produceSelectedItemsString()}
                                features={produceFeatures()}
                                minSalary={produceMinSalary()}
                                total={produceSelectedTotal()}
                                />
                </div>

                <div className="col-1"></div>

                <div className="App-body col-8">

                    <p>Scroll down to view countries offering digital nomad visa</p>
                    {filteredItems.map((item, index) => ( // TODO: map mainData to MainItem components
                        <MainItem key={index}
                                  item={item}
                                  addCounter={handleAddClick}
                                  removeCounter={handleRemoveClick}
                                  selected={selectedStatus[item.id]}/> // replace with MainItem component
                    ))}
                </div>

            </div>
        </div>
    );
}

export default App;
