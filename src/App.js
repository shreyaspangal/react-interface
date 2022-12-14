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
  });

  const onSendAppointment = (addInfo) => {
    const newInfo = [...appointmentList, addInfo];
    setAppointmentList(newInfo);
  }

  const lastId = appointmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0);

  return (
    <div className="App container mx-auto my-8 xs: w-11/12 sm:w-4/5 lg:w-1/2 font-thin">
      <h1 className="xs:text-3xl md:text-5xl mb-5">
        < BiCalendarEvent className="inline-block align-top text-blue-500" /> Your Appointments
      </h1>
      <AddAppointment
        onSendAppointment={onSendAppointment}
        lastId={lastId}
      />
      <Search
        query={query}
        onQueryChange={onQueryChange}
        sortBy={sortBy} setSortBy={setSortBy}
        orderBy={orderBy} setOrderBy={setOrderBy}
      />
      <ul className="divide-y divide-gray-200">
        {
          filteredAppointments.map(appointment => (
            <AppointmentInfo
              key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={onDeleteAppointment} />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
