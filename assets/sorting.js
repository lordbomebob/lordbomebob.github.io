const tableArea=document.getElementById(`table`)
let assignmentData=[]



fetch(`./Assignment.JSON`)
    .then((response)=> response.json())
    .then((data)=>{
        assignmentData= data
    }
)
.catch(console.error)



var createTableRow=function(data){
    return `
    <tr>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.description}</td>
    </tr>
    `;
}

var createTableInHtml=function(dataJson){
    tableArea.innerHTML=``
    console.log(dataJson)
    for(let data of dataJson){
        tableArea.innerHTML+=createTableRow(data)
    }
}

console.log(assignmentData)
createTableInHtml(assignmentData)

