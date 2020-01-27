/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
   Global variables for DOM elements to reference and/or manipulate. 
***/
const studentList = document.getElementsByClassName('student-item cf');
const studentsPerPage = 10;

// Additional global variables for search function which was removed from html
const pageHeader = document.querySelector('.page-header cf');
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

// Add className, type, attributes, innerHTML, etc for elements
searchDiv.setAttribute('class', 'search-student');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('class', 'search');
searchInput.placeholder = 'Search for students...';
searchButton.setAttribute('type', 'button');
searchButton.setAttribute('class', 'search');
searchButton.innerHTML = 'Search';

// Append elements to pageHeader, and searchDiv
pageHeader.appendChild(searchDiv);
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);

/***
   `searchStudent` function to show student entered
 ***/
const searchStudent = () =>
{
   
}

/*** 
   `showPage` function to hide all of the items in the 
   list except for the ten you want to show.
***/
const showPage = (studentList, page) =>
{
   // Declare local variables start and end index for list of items shown on page
   let startIndex = (page * studentsPerPage) - studentsPerPage;
   let endIndex = page * studentsPerPage;

   // Use a for loop to loop over the list items 
   for (let i = 0; i < studentList.length; i++)
   {  
      // If statement to display list items dependent on the index and page/button selected
      if (i >= startIndex && i < endIndex)
      {
         studentList[i].style.display = "block";
      }
      else
      {
         studentList[i].style.display = "none";
      }
   }
}

/*** 
   `appendPageLinks` function to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (studentList) =>
{
   // Declare local variables 
   let numberOfPages = Math.ceil(studentList.length / studentsPerPage);
   let pageDiv = document.querySelector('.page');
   let paginationDiv = document.createElement('div');
   let paginationUl = document.createElement('ul');   

   // Assign pagination div element a new class name 
   paginationDiv.className = 'pagination';

   // Append pagination div & ul elements to pageDiv and paginationDiv
   pageDiv.appendChild(paginationDiv);
   paginationDiv.appendChild(paginationUl);

   // Use for loop to loop through the number of pages to add a li and a tag
   for (let i = 0; i < numberOfPages; i++)
   {
      // Declare nested variables for li & a elements
      let paginationLi = document.createElement('li');
      let paginationA = document.createElement('a');

      // Append paginationLi & paginationA elements
      paginationUl.appendChild(paginationLi);
      paginationLi.appendChild(paginationA);

      // Set anchor element href attribute to # & set text to the page number for each link
      paginationA.href = "#";
      paginationA.textContent = i + 1;

      // If statment to add active class name to first pagination link
      if (i === 0)
      {  
         paginationA.setAttribute('class', 'active');
      }
   }

   // Declare a DOM element for the anchor element - Found this in ES2015 video for loops
   let pageClicked = document.querySelectorAll('a');

   // Use for loop to loop through all page link and match the page with the students in the list
   for (let i = 0; i < pageClicked.length; i++)
   {
      // Add event listener when acnhor/page/button is selected
      pageClicked[i].addEventListener('click', (event) =>
      {
         // Remove active class from previous clicked link
         let previousPage = document.querySelector('.active');
         previousPage.className = '';

         // Add active class to current link & apply text to page being passed
         let currentPage = event.target;
         let page = currentPage.textContent;
         currentPage.className = 'active';
         
         // Call showPage function passing 2 parms
         showPage(studentList, page);
      });
   }
}

/***
   Call showPage function, passing the global variable for list of students and page #1 initially
 ***/
showPage(studentList, 1);


/***
   Call appendPage function, passing the global variable for list of students
 ***/
appendPageLinks(studentList);

/***
    Toggle Search function is an event listener to show student entered in search 
 ***/
// toggleSearch.addEventListener('click', () =>
// {     
//   if (listDiv.style.display == 'none') 
//   {
//     listDiv.style.display = 'block'; 
//   }
//   else
//   { 
//     toggleList.textContent = 'Show List';
//     listDiv.style.display = 'none'; 
//   }
// });

// Remember to delete the comments that came with this file, and replace them with your own code comments.