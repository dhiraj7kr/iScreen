// Function to display the current date and time
function updateDateTime() {
  const now = new Date();
  const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  
  document.getElementById('current-date').innerText = now.toLocaleDateString('en-US', optionsDate);
  document.getElementById('current-time').innerText = now.toLocaleTimeString('en-US', optionsTime);
}

// Function to display the calendar for the current month
function displayCalendar() {
  const calendarElement = document.getElementById('calendar-body');
  const headerElement = document.getElementById('calendar-header');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Set calendar header
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  headerElement.innerText = `${monthNames[month]} ${year}`;
  
  // Generate calendar body
  let calendarHTML = '<table><thead><tr>';
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      calendarHTML += `<th>${day}</th>`;
  });
  calendarHTML += '</tr></thead><tbody><tr>';
  
  // Adding empty cells for days before the start of the month
  for (let i = 0; i < firstDay; i++) {
      calendarHTML += '<td></td>';
  }
  
  // Adding days of the month
  for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const isToday = currentDate.toDateString() === now.toDateString();
      calendarHTML += `<td${isToday ? ' class="current-day"' : ''}>${day}</td>`;
      if ((firstDay + day) % 7 === 0) {
          calendarHTML += '</tr><tr>';
      }
  }
  
  // Adding empty cells for days after the end of the month
  if ((firstDay + daysInMonth) % 7 !== 0) {
      for (let i = (firstDay + daysInMonth) % 7; i < 7; i++) {
          calendarHTML += '<td></td>';
      }
  }
  
  calendarHTML += '</tr></tbody></table>';
  calendarElement.innerHTML = calendarHTML;
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      }
  }
}

// Add event listener to fullscreen button
document.getElementById('fullscreen-button').addEventListener('click', toggleFullscreen);

// Function to request a wake lock
async function requestWakeLock() {
  try {
      if ('wakeLock' in navigator) {
          const wakeLock = await navigator.wakeLock.request('screen');
          // Handle the wake lock object here if needed
          console.log('Wake Lock is active');
      } else {
          console.warn('Wake Lock API is not supported on this device.');
      }
  } catch (error) {
      console.error('Failed to acquire wake lock:', error);
  }
}

// Initial load
updateDateTime();
displayCalendar();
setInterval(updateDateTime, 1000);
requestWakeLock(); // Request wake lock on page load
