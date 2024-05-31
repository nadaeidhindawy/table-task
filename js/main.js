
let index = 1;
let table = localStorage.getItem("table");

let data = [];
if (table) {
    data = JSON.parse(table);
    index += +data.length;
    showTableFromStorage();
} else {
    data = [];
}
function add() {
    let form = document.getElementById("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let BookmarkName = document.getElementById("BookmarkName").value;
        let url = document.getElementById("url").value;
        setTimeout(() => {
            if (BookmarkName && url) data.push({ BookmarkName, url });
            if (data[index - 1]['url'].slice(0, 8) !== 'https://') {
                Swal.fire({
                    template: "#my-template"
                });
                data.pop();
            }
        }, 100);
    });
    showTable();

}


function showTable() {
    let tr = document.getElementById("bodyTable");
    console.log("@@@@@@@@@@@@@@@@@@", index);
    setTimeout(() => {
        let name = data[index - 1]['BookmarkName'];
        let u = data[index - 1]['url'];
        let trHTML = `
        <tr id="${'tr' + index}">
        <td>${index++}</td>
        <td>${name}</td>
        <td>
        <button type="button" class="btn btn-primary">
        <a class="vist" href=${u} target='_blank'>Visit</a>
        </button>        
        </td>
        <td>
        <button type="button" class="btn btn-danger" onclick="deleteElement(${index - 1})">
        Delete
        </button>
        </td>
        </tr>
        `;
        tr.innerHTML += trHTML;
        localStorage.setItem("table", JSON.stringify(data));
        document.getElementById("url").value = '';
        document.getElementById("BookmarkName").value = '';

    }, 200)

}


function showTableFromStorage() {
    let tr = document.getElementById("bodyTable");
    setTimeout(() => {
        for (let i = 0; i < data.length; i++) {
            let name = data[i]['BookmarkName'];
            let u = data[i]['url'];
            let trHTML = `
            <tr id="${'tr' + i}">
            <td>${i + 1}</td>
            <td>${name}</td>
            <td>
            <button type="button" class="btn btn-primary">
            <a class="vist" href=${u} target='_blank'>Visit</a>
            </button>        
            </td>
            <td>
            <button type="button" class="btn btn-danger" onclick="deleteElement(${i})">
            Delete
            </button>
            </td>
            </tr>
            `;
            tr.innerHTML += trHTML;
            localStorage.setItem("table", JSON.stringify(data));
            document.getElementById("url").value = '';
            document.getElementById("BookmarkName").value = '';
        }

    }, 200)

}

function deleteElement(i) {
    console.log(i)
    localStorage.clear();
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            data.splice(i, 1);
            const element = document.getElementById("tr" + i);
            element.remove();
            localStorage.setItem("table", JSON.stringify(data));
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

}


