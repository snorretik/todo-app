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
            });
        }

        // project name al invullen
        function setProjectName() {
            const projectNameEl = document.querySelector("#projectName");
            projectNameEl.value = "main";
        }

        // project select list weergeven
        function setProjectSelect() {
            let projectsEl = document.querySelector("#projects");
            projectsEl.addEventListener('click', (e) => {
                showList();
            });
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
            this.expanded = false;
            this.striked = false;
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

        prioritySwitch() {
            switch (this.priority) {
                case "yellow":
                    this.priority = "orange";
                    break;
                case "orange":
                    this.priority = "red";
                    break;
                case "red":
                    this.priority = "yellow";
                    break;
                default:
                    console.log(this.priority);
                    break;
            }
        }

        get expandedVal() {
            return this.expanded;
        }

        expandedSwitch() {
            if (this.expanded) {
                this.expanded = false;
            }
            else if (!(this.expanded)) {
                this.expanded = true;
            } else {
                console.log(this.expanded);
            }
        }

        get descriptionVal() {
            return this.description;
        }

        get strikedVal() {
            return this.striked;
        }

        strikeThroughSwitch() {
            if (this.striked) {
                this.striked = false;
            } else {
                this.striked = true;
            }
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
            elementToAdd.setAttribute("id", `selector${name}`);
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

        let numberExp = 0;

        while (listEl.firstChild) {
            listEl.removeChild(listEl.firstChild);
        }

        for (let i = 0; i < verzameling[selectedListVal].length; i++) {
            let label1 = document.createElement('label');
            label1.setAttribute("id", `titleNo${i + 1}`);
            label1.setAttribute("class", "titleDis textualGroup");
            label1.textContent = verzameling[selectedListVal][i].titleVal;

            let label2 = document.createElement('label');
            label2.setAttribute("id", `dueDateNo${i + 1}`);
            label2.setAttribute("class", "dateDis textualGroup");
            label2.textContent = verzameling[selectedListVal][i].dueDateVal;

            let button1 = document.createElement('button');
            button1.setAttribute("id", `priorityNo${i + 1}`);
            button1.setAttribute("class", "listPriorities");
            button1.style.backgroundColor = `${verzameling[selectedListVal][i].priorityVal}`
            button1.addEventListener('click', (e) => {
                button1Event(selectedListVal, i);
            });

            let button2 = document.createElement('button');
            button2.setAttribute("id", `expandNo${i + 1}`);
            button2.setAttribute("class", 'expandDis');
            if (!(verzameling[selectedListVal][i].expandedVal)) {
                button2.textContent = "\\/";
            } else if (verzameling[selectedListVal][i].expandedVal) {
                button2.textContent = "/\\";
            } else {
                console.log("button 2 textcontent")
            }
            button2.addEventListener('click', (e) => {
                button2Event(selectedListVal, i);
            });

            let button3 = document.createElement('input');
            button3.setAttribute("id", `checkNo${i + 1}`);
            button3.setAttribute("class", "checkDis");
            button3.setAttribute("type", "checkbox");
            button3.addEventListener('click', (e) => {
                button3Event(selectedListVal, i);
            });

            listEl.appendChild(label1);
            listEl.appendChild(label2);
            listEl.appendChild(button1);
            listEl.appendChild(button3);
            listEl.appendChild(button2);

            if (verzameling[selectedListVal][i].expandedVal) {
                let label3 = document.createElement('label');
                label3.setAttribute("id", `descpNo${i + 1}`);
                label3.setAttribute("class", "textualGroup")
                label3.textContent = verzameling[selectedListVal][i].descriptionVal;

                let button4 = document.createElement(`button`);
                button4.setAttribute("id", `deleteNo${i + 1}`);
                button4.setAttribute("class", "deleteButtons");
                button4.textContent = "Del"
                button4.addEventListener('click', (e) => {
                    button4Event(selectedListVal, i);
                })

                listEl.appendChild(label3);
                listEl.appendChild(button4);

            } else if (!(verzameling[selectedListVal][i].expandedVal)) {
                console.log("niet expanded");
            }

            listEl.style.cssText = `grid-template-rows: repeat(${i + 1 + numberExp}, 20px)`;
        }

        function button1Event(valProj, number) {
            verzameling[valProj][number].prioritySwitch();
            showList();
        }

        function button2Event(valProj, number) {
            if (!(verzameling[valProj][number].expandedVal)) {
                verzameling[valProj][number].expandedSwitch();
                numberExp += 1;
                showList();
            } else if (verzameling[valProj][number].expandedVal) {
                verzameling[valProj][number].expandedSwitch();
                numberExp -= 1;
                showList();
            } else {
                console.log(`${verzameling[valProj][number].expandedVal} is button2Event`);
            }
        }

        function button3Event(valProj, number) {
            verzameling[valProj][number].strikeThroughSwitch();
            
            let groep = document.querySelectorAll(".textualGroup")
            
            if (verzameling[valProj][number].strikedVal) {
                groep.forEach((textEl) => {
                    textEl.style.cssText = "text-decoration: line-through";
                });
            } else {
                groep.forEach((textEl) => {
                    textEl.style.cssText = "text-decoration: none";
                });
            }
        }

        function button4Event(valProj, number) {
            verzameling[valProj].splice(number, 1);

            if ((verzameling[valProj].length == 0) && (valProj != "main")) {
                delete verzameling[valProj];
                
                let container = document.querySelector("#projects")
                let deleteSelector = document.querySelector(`#selector${valProj}`);

                container.removeChild(deleteSelector);

            } else if ((verzameling[valProj].length == 0) && (valProj == "main")) {
                console.log(`delete niet want dit is ${valProj}`);
            } else if (verzameling[valProj].length != 0) {
                console.log(`deze is nog niet leeg`);
            } else {
                console.log(`iets is misgegaan met ${valProj} als valProj`);
            }

            showList();
        }
    }


    // ----------

    return { initializePage }
})();

variableExport.initializePage();