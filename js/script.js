/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
   Global variables for DOM elements to reference and/or manipulate. 
***/
const studentList = document.getElementsByClassName('student-item');
const studentsPerPage = 10;

// Additional global variables for search function which was removed from html
const page = document.querySelector('.page');
const resultsMsg = document.createElement('p');
const mainDiv = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

// Add className, type, attributes, innerHTML, etc for elements
searchDiv.className = 'search-student';
searchInput.type = 'text';
searchInput.className = 'search';
searchInput.placeholder = 'Search for students...';
searchButton.className = 'search';
searchButton.innerHTML = 'Search';
resultsMsg.textContent = 'No results were found.';

// Append elements to pageHeader, and searchDiv
page.appendChild(resultsMsg);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
mainDiv.appendChild(searchDiv);


/***
   `searchStudent` function to show student entered
 ***/
const searchStudent = (text, list) =>
{  
   // Set searchResults as an empty array 
   let searchResults = [];

   // Use for loop to loop through student list array to search 
   for (let i = 0; i < list.length; i++)
   {
      // Declare local variables for search function & convert string to lowercase
      const student = list[i];
      const studentName = student.firstElementChild.children[1].innerHTML.toLowerCase();
      
      // If statement to pull results
      if (text.length !== 0 && studentName.includes(text.toLowerCase()))
      {
         searchResults.push(student[i]);
         student.style.display = '';
      }
      else
      {
         student.style.display = 'none';
      }
   }
   return searchResults;
}

/***
   `Search` event handler for click or keyup to process user input
 ***/
searchButton.addEventListener('click', (event) =>
{
   event.preventDefault();
   const text = searchInput.value;

   // Call functions
   const numOfStudentSearch = searchStudent(text, studentList);
   
   if (numOfStudentSearch.length !== 0)
   {
      resetPageLinks();
      appendPageLinks(numOfStudentSearch);
   }
   else
   {
      resetPageLinks();
      appendPageLinks(studentList);
   }
});

searchInput.addEventListener('keyup', (event) =>
{  
   // Call search student
   const numOfStudentSearch = searchStudent(event.target.value, studentList);

   if (numOfStudentSearch.length !== 0)
   {
      resetPageLinks();
      appendPageLinks(numOfStudentSearch);
   }
   else
   {
      resetPageLinks();
      appendPageLinks(studentList);
   }
});

/*** 
   `showPage` function to hide all of the items in the 
   list except for the ten you want to show.
***/
const showPage = (list, page) =>
{
   // Declare local variables start and end index for list of items shown on page
   let startIndex = (page * studentsPerPage) - studentsPerPage;
   let endIndex = page * studentsPerPage;
   
   resultsMsg.style.display = 'none';

   if (list.length === 0)
   {
      resultsMsg.style.display = '';
   }

   // Use a for loop to loop over the list items 
   for (let i = 0; i < list.length; i++)
   {  
      // If statement to display list items dependent on the index and page/button selected
      if (i >= startIndex && i < endIndex)
      {
         list[i].style.display = 'block';
      }
      else
      {
         list[i].style.display = 'none';
      }
   }
}

/*** 
   `appendPageLinks` function to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) =>
{
   // Declare local variables 
   const numberOfPages = Math.ceil(list.length / studentsPerPage);
   const pageDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   const paginationUl = document.createElement('ul');   

   // Assign pagination div element a new class name 
   paginationDiv.className = 'pagination';

   // Append pagination div & ul elements to pageDiv and paginationDiv
   pageDiv.appendChild(paginationDiv);
   paginationDiv.appendChild(paginationUl);

   // Use for loop to loop through the number of pages to add a li and a tag
   for (let i = 0; i < numberOfPages; i++)
   {
      // Declare nested variables for li & a elements
      const paginationLi = document.createElement('li');
      const paginationA = document.createElement('a');

      // Append paginationLi & paginationA elements
      paginationUl.appendChild(paginationLi);
      paginationLi.appendChild(paginationA);

      // Set anchor element href attribute to # & set text to the page number for each link
      paginationA.href = "#";
      paginationA.textContent = i + 1;
   }

   // Add active class name to first pagination link
   paginationUl.firstElementChild.firstElementChild.className = 'active';

   /***
      Call showPage function, passing the global variable for list of students and page #1 initially
   ***/
   showPage(list, 1);

   // Declare a DOM element for the anchor element - Found this in ES2015 video for loops
   const pageClicked = document.querySelectorAll('a');

   // Use for loop to loop through all page link and match the page with the students in the list
   for (let i = 0; i < pageClicked.length; i++)
   {
      // Add event listener when acnhor/page/button is selected
      pageClicked[i].addEventListener('click', (event) =>
      {
         // Add active class to current link & apply text to page being passed
         const currentPage = event.target;
         const page = currentPage.textContent;
         currentPage.className = 'active';

         // Remove active class from previous clicked link
         const previousPage = document.querySelector('.active');
         previousPage.className = '';

         // Call showPage function passing 2 parms
         showPage(list, page);
      });
   }
}

/*** 
   `searchPagination` function to remove 
   functionality to the pagination buttons.
***/
const resetPageLinks = () =>
{
   // Select a DOM element to remove links
   const pageLinks = document.querySelector('.pagination');
   page.removeChild(pageLinks);
}

/***
   Call appendPage function, passing the global variable for list of students
 ***/
appendPageLinks(studentList);