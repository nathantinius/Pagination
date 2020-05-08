/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Student List Area - These Variables get and create the student list area from/to the DOM
const studentsList = document.querySelector('.student-list');
let students = studentsList.children;
const getPage = document.querySelector('.page');
const setDiv = document.createElement('div');
setDiv.className = "pagination";
const ul = document.createElement('ul');

//Page Settings - These variables set up the page conditions
const pageSize = 10;

// Search Bar Area - These Variables get and create the search area from/to the DOM
const getHeader = document.querySelector('.page-header');
let searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
let searchBar = document.createElement('input');
let searchButton = document.createElement('button');

// No Results Area - These Variables get and create the No Results area from/to the DOM
const noResults = document.createElement('h3');
const noResultsDiv = document.createElement('div');


/***
 * showPage Function -
 * Displays the studentsList as a paginated result 
 ***/
function showPage(students, pageNumber) {

   let startRange = (pageNumber - 1) * pageSize;
   let endRange = pageNumber * pageSize;

   for (i = 0; i < students.length; i++) {
      students[i].style.display = 'none';
      if (i >= startRange && i < endRange) {
         students[i].style.display = '';
      }
   }
}

/***
 * buildPageButton Function -
 * Creates the page links based on the volume 
 * of students and either returns a list of 
 * page buttons or returns a no results found
 * if the pageTotal is 0
 * 
 * The addEventListener is a part of this function
 ***/
function buildPageButtons(students, pageTotal) {
   noResults.innerHTML = "";
   if (pageTotal > 0) {
      for (i = 1; i < pageTotal + 1; i++) {
         let li = document.createElement('li');
         let pageLink = document.createElement('a');
         if (i == 1) {
            pageLink.className = 'active';
         }
         pageLink.textContent = i;

         pageLink.addEventListener('click', (event) => {
            const buttonClick = event.target;
            showPage(students, buttonClick.textContent);
            setActive(buttonClick);
         })

         li.appendChild(pageLink);
         ul.appendChild(li);
      }
      setDiv.appendChild(ul);
   } else {
      noResults.innerHTML = "Sorry your search returned 0 results";
      setDiv.append(noResults);
   }

   return setDiv;
}

function appendPageLinks(students) {
   // Adds the pagination links to the page and displays the correct list items
   const pageTotal = Math.ceil(students.length / pageSize)

   // Remove any current pagination links
   ul.innerHTML = "";

   const div = buildPageButtons(students, pageTotal);
   getPage.appendChild(div);

   showPage(students, 1);
}

function setActive(buttonClick) {
   const pageLinks = ul.querySelectorAll('li');
   for (i = 0; i < pageLinks.length; i++) {
      const link = pageLinks[i].children[0];
      console.log(link)
      if (buttonClick === link) {
         link.className = 'active';
      } else {
         link.className = '';
      }
   }
}

/***
 * AppendSearch Function -
 * Creates the search elements and
 * appends them to the DOM
 ***/
function appendSearch() {
   searchBar.placeholder = "Search for students..."
   searchBar.addEventListener('keyup', () => {
      searchStudents();
   })
   searchButton.className = "search-button";
   searchButton.textContent = "Search";
   searchDiv.appendChild(searchBar);
   searchDiv.appendChild(searchButton);
   return getHeader.appendChild(searchDiv);
}


// The addEventListener for the Search Button
searchButton.addEventListener('click', (event) => {
   searchStudents();
})

/***
 * SearchStudents Function -
 ***/
function searchStudents() {
   const searchText = searchBar.value.toLowerCase();
   console.log(searchText)
   let results = [];

   for (i = 0; i < students.length; i++) {
      const student = students[i];
      const studentName = student.querySelector('h3').textContent;
      if (studentName.includes(searchText)) {
         console.log(studentName);
         results.push(student);
         student.style.display = '';
      } else {
         student.style.display = 'none';
      }
   }
   appendPageLinks(results);

}

appendPageLinks(students);
appendSearch();
