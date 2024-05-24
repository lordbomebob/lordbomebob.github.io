const tableArea=document.getElementById("table")
let assignmentData=[]



fetch(`./assets/Assignment.json`)
    .then((response)=> response.json())
    .then(info=>{
        assignmentData= info
        createTableInHtml(assignmentData)

    }
)
.catch(console.error)








function createTableRow(data){
    return `
    <tr>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.description}</td>
    </tr>
    `;
}

function createTableInHtml(dataJson){
    tableArea.innerHTML=``
    console.log(dataJson)
    for(let data of dataJson){
        console.log(data)
        tableArea.innerHTML+=createTableRow(data)
    }
}

function alphabetSortCreateTable(){
    assignmentData.sort(compare)
    console.log(assignmentData)
    createTableInHtml(assignmentData)
}


function compare( a, b ) {
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }
    return 0;
}
