import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

import "../Calendar/FullCalendar.scss";
import ModalCalendar from '../Calendar/calendarEventModal';
import axios from "axios";
import moment from 'moment';


const Calendar = ({ renderEventContent }) => {

    const [modalOpen, setModalOpen] = useState(initialState = false);
    const [events, setEvents] = useState(initialState = []);
    const calendarRef = useRef(initialValue = null);

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title
        });
    }

    const handleEventAdd = async (data) => {
        await axios.get(url = "/api/calendar/create-event", data.event);
    }

    const handleDatesSet = async (data) => {
        const momentStartAndEnd = moment(data.start).toISOString() + "&end=" + moment(data.end).toISOString();
        const response = await axios.post(url = "/api/calendar/get-events?start=" + momentStartAndEnd);
        setEvents(response.data)
    }

    // fonction pour le changement de couleur des events sur le calendirer
    document.addEventListener('DOMContentLoaded', async function () {
        const calendarEl = document.getElementById('calendar');

        // Récupérez les package de votre API ici
        // const dates = await fetchVotreAPI();

        const packages = 10;

        const calendarAvailable = new FullCalendar.Calendar(calendarEl, {
            events: [
                // vos événements ici
            ],
            eventColor: function (arg) {
                // Utilisez les dates de l'API pour déterminer la couleur
                if (packages >= 3) {
                    return 'green'; // forfaits disponible
                } else if (packages <= 3 && packages <= 1) {
                    return 'orange'; // plus que 3 forfaits
                } else {
                    return 'red'; // forfait indisponible
                }
            },
        });

        calendar.render();
    });


    return (
        <>
            <section >
                <div className='calendar__container'>
                    {/* {myInstitution} */}

                    <div className='calendar__info'>
                        <h1 className='calendar__title'>Calendrier des <span className='calendar__subtitle'>forfaits</span></h1>

                        <button className='calendar__button' onClick={() => setModalOpen(value = true)}>Ajouter un forfait</button>

                    </div>


                    <div className='calendar__calendarContainer'>
                        <FullCalendar className='calendar__calendar'
                            height={800}
                            width={500}
                            // m
                            dayHeaderFormat={{ weekday: 'long' }}

                            ref={calendarRef}
                            //pour la vue mensuelle , timeGridPlugin, listPlugin
                            plugins={[dayGridPlugin]}
                            // vue initial en mensuelle
                            initialView='dayGridMonth'
                            // headerToolbar= {(
                            // left = 'prev,next today',
                            // center = 'title',
                            // right = 'dayGridMonth,timeGridWeek,listWeek'
                            // )}
                            // dayHeaders='timeGridDay'
                            // 'timeGridDay'
                            // afficher les numéros de la semaine
                            weekNumbers={true}
                            //signifie que les week-ends seront affichés dans le calendrier.
                            weekends={true}
                            //un tableau d’événements à afficher sur le calendrier
                            events={events}
                            //fonction pour rendre le contenu de l’événement
                            // eventContent={renderEventContent}
                            eventAdd={(event = EventAddArg => handleEventAdd(event))}
                            datesSet={(date = DateSetArg => handleDatesSet(date))}

                            // le calendrier sera affiché en français
                            locale={'frLocale'}
                            //le calendrier affichera les heures en fonction du fuseau horaire local de l’utilisateur
                            timeZone={'local'}
                            //signifie que la semaine commencera par dimanche
                            firstDay={1}
                            // sur false, les utilisateurs ne peuvent pas sélectionner de dates ou de plages de dates
                            select={false}
                            // Cette propriété est définie sur false, ce qui signifie que les utilisateurs ne peuvent pas déplacer ou redimensionner les événements.
                            editable={false}
                            //ce qui signifie qu’un maximum de 3 événements seront affichés chaque jour
                            dayMaxEvents={3}
                        />
                    </div>
                    <ModalCalendar
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(value = false)}
                        onEventAdded={(event) => onEventAdded(event)}
                    />
                </div>
            </section>
        </>
    );

}

export default Calendar;