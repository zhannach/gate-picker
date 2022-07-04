import {
  format,
  getUnixTime,
  fromUnixTime, 
  addMonths,
  subMonths,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from 'date-fns'

const datePickedButton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeaderText = document.querySelector('.current-month')
const prevMonthButton = document.querySelector('.prev-month-button')
const nextMonthButton = document.querySelector('.next-month-button')
const dateGrid = document.querySelector('.date-picker-grid-dates')
let currentDate = new Date()


datePickedButton.addEventListener('click', () => {
  datePicker.classList.toggle('show')
  const selectedDate = fromUnixTime(datePickedButton.dataset.selectedDate)
  currentDate = selectedDate
  setupDatePicker(selectedDate)
})

function setDate(date) {
  datePickedButton.innerHTML = format(date, 'MMMM do, yyyy')
  datePickedButton.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerHTML = format(currentDate, 'MMMM - yyyy')
  setupDates(selectedDate)
}

function setupDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate))
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
  const dates = eachDayOfInterval({start: firstWeekStart, end: lastWeekEnd})
  dateGrid.innerHTML = ""
  dates.forEach(date => {
    const dateElement = document.createElement('button')
    dateElement.classList.add('date')
    dateElement.innerText = date.getDate()

    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add('date-picker-other-month-date')
    }
    if(isSameDay(date, selectedDate)) {
       dateElement.classList.add('selected')
    }

    dateElement.addEventListener('click', () => {
      setDate(date)
      datePicker.classList.remove('show')
    })
    
    dateGrid.appendChild(dateElement)
  })
  }

nextMonthButton.addEventListener('click',() => {
  const selectedDate = fromUnixTime(datePickedButton.dataset.selectedDate)
  currentDate = addMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})

prevMonthButton.addEventListener('click',() => {
  const selectedDate = fromUnixTime(datePickedButton.dataset.selectedDate)
  currentDate = subMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})


setDate(new Date())
