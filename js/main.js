if (typeof window.DynamicTable !== 'function') {

    function DynamicTable(GLOB, htmlTable, config) {
        if (!(this instanceof DynamicTable)) {
            return new DynamicTable(GLOB, htmlTable, config);
        }
        var DOC = GLOB.document,
            tableRows = htmlTable.rows,
            RLength = tableRows.length,
            CLength = tableRows[0].cells.length,
            inElement = null,
            button = null,
            butText = null,
            self = this,
            i, j;

        this.insertButtons = function() {
            inElement = DOC.createElement("P");
            inElement.className = "d-butts";

            button = DOC.createElement("BUTTON");
            button.onclick = this.delRow;

            butText = DOC.createTextNode("Удалить задачу");
            button.appendChild(butText);
            inElement.appendChild(button);
            button = DOC.createElement("BUTTON");
            button.onclick = this.addRow;

            butText = DOC.createTextNode("Добавить поле");
            button.appendChild(butText);
            inElement.appendChild(button);
            return inElement;
        };
        this.addRow = function(ev) {
            var e = ev || GLOB.event,
                target = e.target || e.srcElement,
                row = target.parentNode.parentNode.parentNode,
                cellCount = row.cells.length,
                index = row.rowIndex + 1,
                i;
            htmlTable.insertRow(index);
            for (i = 0; i < cellCount; i += 1) {

                htmlTable.rows[index].insertCell(i);
                if (i == cellCount - 1) {
                    inElement = self.insertButtons();
                } else {
                    inElement = DOC.createElement("INPUT");
                    inElement.name = config[i + 1] + "[]";
                }
                htmlTable.rows[index].cells[i].appendChild(inElement);
            }
            inElement = null;
            return false;
        };

        this.delRow = function(ev) {
            if (tableRows.length > 2) {
                htmlTable.deleteRow(this.parentNode.parentNode.parentNode.rowIndex);
            } else {
                return false;
            }
        };

        return (function() {
            for (i = 1; i < RLength; i += 1) {
                for (j = 0; j < CLength; j += 1) {
                    if (j + 1 == CLength) {
                        inElement = self.insertButtons();
                    } else {
                        inElement = DOC.createElement("INPUT");
                        inElement.value = tableRows[i].cells[j].firstChild.data;
                        inElement.name = config[j + 1] + "[]";
                        tableRows[i].cells[j].firstChild.data = "";
                    }
                    tableRows[i].cells[j].appendChild(inElement);
                    inElement = null;
                }
            }

        }());

    } // end function DynamicTable

}

new DynamicTable(window,
    document.getElementById("dynamic"), { 1: "val1", 2: "val2", 3: "val3", 4: "val4" });

function saveCategory() {
    let text = document.getElementsById("val1[]").value;
    alert(text);
}

// window.localStorage.getItem('val1')
window.localStorage.setItem('val1', window.prompt("Возможно, внесенные изменения не сохранятся"));
// window.alert(window.localStorage.getItem('val1'));