import { format, getUnixTime, fromUnixTime, addMonths, subMonths } from 'date-fns'

const datePickedButton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeaderText = document.querySelector('.current-month')
const prevMonthButton = document.querySelector('.prev-month-button')
const nextMonthButton = document.querySelector('.next-month-button')

datePickedButton.addEventListener('click', () => {
  datePicker.classList.toggle('show')
  const selectedDate = fromUnixTime(datePickedButton.dataset.selectedDate)
  setupDatePicker(selectedDate)
})

function setDate(date) {
  datePickedButton.innerHTML = format(date, 'MMMM do, yyyy')
  datePickedButton.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(selectedDate) {
  datePickerHeaderText.innerHTML = format(selectedDate, 'MMMM - yyyy')
  setupMonthButton(selectedDate)
}

function setupMonthButton(selectedDate) {
  nextMonthButton.addEventListener(
    'click',
    () => {
      setupDatePicker(addMonths(selectedDate, 1))
    },
    { once: true }
  )

  prevMonthButton.addEventListener(
    'click',
    () => {
      setupDatePicker(subMonths(selectedDate, 1))
    },
    { once: true }
  )
}

setDate(new Date())
