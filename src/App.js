import { useState, useEffect, useCallback } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from './components/AddAppointment';
import AppointmentInfo from "./components/AppointmentInfo";

function App() {

  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState('');
  let [sortBy, setSortBy] = useState('petName');
  let [orderBy, setOrderBy] = useState('asc');

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDeleteAppointment = (appointmentId) => {
    const filteredList = appointmentList.filter(appointment => appointment.id !== appointmentId);
    setAppointmentList(filteredList);
  }

  const onQueryChange = (event) => {
    setQuery(event.target.value);
  }

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order : 1 * order
    )
  })

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-5">
        < BiCalendarEvent className="inline-block align-top text-blue-500" /> Your Appointments
      </h1>
      <AddAppointment />
      <Search query={query} onQueryChange={onQueryChange} />
      <ul className="divide-y divide-gray-200">
        {
          filteredAppointments.map(appointment => (
            <AppointmentInfo key={appointment.id} appointment={appointment} onDeleteAppointment={onDeleteAppointment} />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
