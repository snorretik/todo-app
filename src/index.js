// import from date-fns

// ik zit te denken, ik heb wat dingen die ik moet initialiseren zoals de knoppen... dus daarom een IIFE.
let variableExport = (() => {
    // gewoon een array van objects(individuele todo's)
    let verzameling = { main: [], };

    // begin, 1 functie
    function initializePage() {
        // make knop
        function setMakeButton() {
            let makeEl = document.querySelector("#make");
            makeEl.addEventListener('click', (e) => {
                addToList();
            })
        }

        // project name al invullen
        function setProjectName() {
            const projectNameEl = document.querySelector("#projectName");
            projectNameEl.value = "main";
        }

        // project select list weergeven
        function setProjectSelect() {
            let projectsEl = document.querySelector("#projects");
            // weet even niet, moet een voorbeeld hebben met meerdere projecten, eerst daar naartoe
        }

        // functies aanroepen
        setMakeButton();
        setProjectName();
        setProjectSelect();
    }

    class Todo {
        constructor(title, dueDate, description, proName, priority) {
            this.title = title
            this.dueDate = dueDate
            this.description = description
            this.proName = proName
            this.priority = priority
        }

        get titleVal() {
            return this.title;
        }

        get dueDateVal() {
            return `${this.dueDate[0]}-${this.dueDate[1]}-${this.dueDate[2]}`;
        }

        get priorityVal() {
            return this.priority;
        }

        // set priority moet worden aangeroepen door knop dynamisch gecreëerd bij make
    }

    // alles met dom dynamisch
    function addToList() {
        // function dom
        let titleTemp = "";
        let dueDateTemp = [];
        let descriptionTemp = "";
        let proNameTemp = "";
        let priorityTemp = "";

        function gettingValues() {
            let titleEl = document.querySelector("#title");
            titleTemp = titleEl.value;

            // dueDate moet nog omgezet worden
            let dueDateEl = document.querySelector("#due");
            dueDateTemp = convertDueDate(dueDateEl.value);

            let descriptionEl = document.querySelector("#describ");
            descriptionTemp = descriptionEl.value;

            // proName moet aangemaakt worden voor select
            let proNameEl = document.querySelector("#projectName");
            proNameTemp = proNameEl.value;

            let priorityEl = document.querySelector("#priority");
            priorityTemp = priorityEl.value;
        }

        // -------------------------------
        // create class with the variables
        function addData() {
            if (!(proNameTemp in verzameling)) {
                // als proNameTemp in verzameling == false
                verzameling[proNameTemp] = [];
                makeProjectName(proNameTemp);
            } else {
                // als proNameTemp in verzameling == true
                console.log(proNameTemp)
            }

            let toAddToDo = new Todo(titleTemp, dueDateTemp, descriptionTemp, proNameTemp, priorityTemp);
            verzameling[proNameTemp].push(toAddToDo);
        }


        // -------------------------------

        // ik weet niet of deze nodig is...
        function convertDueDate(dueStringMan) {
            let arrayDate = dueStringMan.split("-");
            
            return arrayDate;
        }

        function makeProjectName(name) {
            let nameTemp = document.querySelector("#projects");

            let elementToAdd = document.createElement('option');
            elementToAdd.setAttribute("class", "projectClass");
            elementToAdd.setAttribute("value", `${name}`);
            elementToAdd.textContent = `${name}`;

            nameTemp.appendChild(elementToAdd);
        }

        gettingValues();
        addData();
        showList();
    }

    // een functie voor het verwijderen van item in list

    function showList() {
        // is heel makkelijk of kort, waarschijnlijk...
        // gewoon array af gaan en dat was het...
        // ja en misschien de buttons creëren die prioriteit moeten togglen
        // en de edit(zou wel mooi zijn) en verwijder knoppen

        let selectedListEl = document.querySelector("#projects");
        let selectedListVal = selectedListEl.value;

        let listEl = document.querySelector("#list-grid");

        while (listEl.firstChild) {
            listEl.removeChild(listEl.firstChild);
        }

        for (let i = 0; i < verzameling[selectedListVal].length; i++) {
            let label1 = document.createElement('label');
            label1.setAttribute("id", `titleNo${i + 1}`);
            label1.textContent = verzameling[selectedListVal][i].titleVal;

            let label2 = document.createElement('label');
            label2.setAttribute("id", `dueDateNo${i + 1}`);
            label2.textContent = verzameling[selectedListVal][i].dueDateVal;

            let button1 = document.createElement('button');
            button1.setAttribute("id", `priorityNo${i + 1}`);
            button1.setAttribute("class", "listPriorities");
            button1.style.backgroundColor = `${verzameling[selectedListVal][i].priorityVal}`
            // event listener van button1

            let button2 = document.createElement('button');
            button2.setAttribute("id", `expandNo${i + 1}`);
            button2.textContent = "\\/";

            listEl.appendChild(label1);
            listEl.appendChild(label2);
            listEl.appendChild(button1);
            listEl.appendChild(button2);
        }
    }


    // ----------

    return { initializePage }
})();

variableExport.initializePage();