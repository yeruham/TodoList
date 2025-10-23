export function addValue(key, value){
    let listOfValues = localStorage.getItem(key);
    const valueId = Date.now()
    const localStorageValue = {"task": value, "id": valueId};
    if (listOfValues == null){
        let newList = [];
        newList.push(localStorageValue);
        newList = JSON.stringify(newList);
        localStorage.setItem(key, newList);
    }
    else{
        listOfValues = JSON.parse(listOfValues);
        listOfValues.push(localStorageValue);
        listOfValues = JSON.stringify(listOfValues);
        localStorage.setItem(key, listOfValues);
    }
    return valueId
}


export function deleteValue(key, id){
    let listOfValues = localStorage.getItem(key);
    if (listOfValues == null){
        return;
    }
    listOfValues = JSON.parse(listOfValues);
    for (let i = 0; i < listOfValues.length; i++){
        if (listOfValues[i].id == id){
            const deletedValue = listOfValues.splice(i, 1);
        }
    }
    listOfValues = JSON.stringify(listOfValues);
    localStorage.setItem(key, listOfValues);
}


export function editValue(key, id, newValue){
    let listOfValues = localStorage.getItem(key);
    if (listOfValues == null){
        return;
    }
    listOfValues = JSON.parse(listOfValues);
    for (let i = 0; i < listOfValues.length; i++){
        if (listOfValues[i].id == id){
            listOfValues[i].task = newValue;
        }
    }
    listOfValues = JSON.stringify(listOfValues);
    localStorage.setItem(key, listOfValues);
}