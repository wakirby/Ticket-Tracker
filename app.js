const ticketForm = document.getElementById('ticketForm');
const cards = document.querySelector('.cards');


//inputs
const id = document.getElementById('id');
const date = document.getElementById('date');
const ticketNum = document.getElementById('ticket');
const contact = document.getElementById('contact');
const phone = document.getElementById('phone');
const issue = document.getElementById('issue');
const details = document.getElementById('details');



const ticketsArr = JSON.parse(localStorage.getItem('Tickets')) || [];

function init(){
 //alert('initializing app');
 id.value = '';
 date.value = '';
}

contact.onblur = () => {
  addId();
  getDate();
}


const addTicket = (id, date, ticket, contact, phone, issue, details) => {

  ticketsArr.push({
    id,
    date,
    ticket,
    contact,
    phone,
    issue,
    details,    
  });

  localStorage.setItem("Tickets", JSON.stringify(ticketsArr));
  return (id, date, ticket, contact, phone, issue, details);
};



cards.style.display = ticketsArr.length === 0 ? "none" : "flex";


function createTicketCard(ticketsArr){

//create layout elements

 const tt_cards_li = document.createElement('li');
 const card_div = document.createElement('div');
 const card_content_div = document.createElement('div');
 const card_title_div = document.createElement('div');
 const card_contact_div = document.createElement('div'); 
 const card_issue_div = document.createElement('div');
 const card_spacer_hr = document.createElement('hr');
 const card_details_p = document.createElement('p');
 const card_footer_div = document.createElement('div');
 const card_edit_btn = document.createElement('button');
 const card_delete_btn = document.createElement('button');

 tt_cards_li.dataset.ticketId = ticketsArr.id;
 card_edit_btn.dataset.editId = ticketsArr.id;
 card_delete_btn.dataset.deleteId = ticketsArr.id;

 // Set classes for each item of card for styling
 tt_cards_li.classList.add('cards__item');
 card_div.classList.add('card'); 
 card_content_div.classList.add('card__content');
 card_title_div.classList.add('card__title');
 card_contact_div.classList.add('card__contact');
 card_issue_div.classList.add('card__issue');
 card_spacer_hr.classList.add('card__spacer');
 card_details_p.classList.add('card__text');
 card_footer_div.classList.add('card__footer');
 card_edit_btn.classList.add('edit');
 card_delete_btn.classList.add('delete');

// add dynamic content to elements
card_title_div.innerHTML = `<div> ${ticketsArr.ticket}</div><div>${ticketsArr.date}</div>`;
card_contact_div.innerHTML = `<div>${ticketsArr.contact}</div><div>${ticketsArr.phone}</div>`;
card_issue_div.innerText = `${ticketsArr.issue}`;
card_details_p.innerText = `${ticketsArr.details}`;
card_edit_btn.innerText = 'Edit';
card_delete_btn.innerText = 'Delete';


//build card using layout generated and post to Card's section of page
card_footer_div.append(card_edit_btn, card_delete_btn);
card_content_div.append(card_title_div, card_contact_div, card_issue_div, card_details_p, card_footer_div);
card_div.appendChild(card_content_div);
tt_cards_li.appendChild(card_div);
cards.appendChild(tt_cards_li);






cards.style.display = ticketsArr.length === 0 ? "none" : "flex";
console.log( id, date, contact, phone, issue, details);

};
cards.style.display = ticketsArr.length === 0 ? "none" : "flex";
ticketsArr.forEach(createTicketCard);

ticketForm .onsubmit = e =>{
 e.preventDefault();
 const newTicket = addTicket(
    id.value,
    date.value,
    ticket.value,
    contact.value,
    phone.value,
    issue.value,
    details.value,  
 );
 createTicketCard(newTicket);
  //clear form data
    id.value = '';
    date.value = '';
    ticket.value = '';
    contact.value = '';
    phone.value = '';
    issue.value = '';
    details.value ='';  
  pageReload();

};

// Fill in Ticket ID and Date
function addId() {
tktId = new Date().getTime();
console.log(tktId)
document.getElementById('id').value = tktId;
};

// Get Date and Format
function getDate(){
let d = new Date();
let t = d.toLocaleTimeString('en-GB');
let dt = d.toLocaleDateString('en-US') + " " + t ;
console.log(dt);
document.getElementById('date').value = dt;

};

function pageReload(){
  window.location.reload();
};



init();