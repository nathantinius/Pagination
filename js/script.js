/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
 * @constant studentsList: gets the children of the ul element
 * @constant pageSize: sets the amount of students per page
 * @type {string} pageNumber: used to keep track of the page number 
 * in the showPage function.
 * @constant getUI: this gets the div where the pagination will live
 * @constant setDiv: creates a new div to live inside getUI
***/

const studentsList = document.querySelector('.student-list').children;
const pageSize = 10;
let pageNumber = 0;
const getUI = document.querySelector('.page');
const setDiv = document.createElement('div');
setDiv.className = "pagination";

/***
 * showPage Function -
 * @constant startRange: sets the beginning of the page size
 * @constant endRange: sets the end of the page size
 * loop through the students list showing only the students that
 * exist between startRange and endRange
 * Use display none as we don't want to destroy list items
***/

const showPage = (students, pageNumber) => {

   let startRange = (pageNumber - 1) * pageSize;
   console.log(startRange);

   let endRange = pageNumber * pageSize;
   console.log(endRange);

   for (i = 0; i < students.length; i++) {
      if (i >= startRange && i < endRange) {
         students[i].style.display = '';
      } else {
         students[i].style.display = 'none';
      }
   }
}

// Defaults to page one.
showPage(studentsList, 1);

/***
 * appendPageLinks Function -
 * @type {string} html: builds the html to append to setDiv
 * @constant totalPages: uses math to round to the next pageNumber 
 * loop through the totalPages creating a link for each new page
 * store the newly created pages to setDiv
 * append setDiv to getUI
***/

const appendPageLinks = () => {
   let html = '<ul>';
   const totalPages = Math.ceil(studentsList.length / pageSize);

   for (i = 0; i < totalPages; i++) {
      pageNumber = i + 1;
      html += `<li><a class="link${i} pageLink" onclick="showPage(studentsList, ${pageNumber}); setActive(event)">${pageNumber}</a></li>`;
   }
   html += '</ul>';

   setDiv.innerHTML = html;
   getUI.append(setDiv);
}

appendPageLinks();

/***
 * @constant pages: used to set event listener
 * loop through all the pageLinks
 * remove active class
 * add active to the event.target
 ***/

const pages = document.querySelectorAll('.pageLink');

const setActive = (event) => {
   for (i = 0; i < pages.length; i++) {
      console.log(pages[i].classList);
      pages[i].classList.remove("active");
   }
   const activeLink = event.target;
   activeLink.classList.add("active");
}