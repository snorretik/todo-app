// ik zit te denken, ik heb wat dingen die ik moet initialiseren zoals de knoppen... dus daarom een IIFE.
let variableExport = (() => {
    // gewoon een array van objects(individuele todo's)

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

    // alles met dom dynamisch
    function addToList() {
        // let listEl = document.querySelector("#list-grid");
        // let titleEl = document.querySelector("#title");

        // let addTitleEl = document.createElement('label');
        // addTitleEl.textContent = titleEl.value;

        // listEl.appendChild(addTitleEl);
    }

    // ----------

    return { initializePage }
})();

variableExport.initializePage();