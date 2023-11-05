import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from 'react-datetime';
import moment from 'moment';
import 'moment/locale/fr';
import '../Calendar/CalendarEventModal.scss';
import '../Calendar/calendarDateTime.scss';
import moment from "moment";

moment.locale('fr');

const ModalCalendar = ({ isOpen, onClose, onEventAdded }) => {
    const [title, setTitle] = useState(initialStat = "");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const onSubmit = (event) => {
        event.preventDefault();

        onEventAdded({
            title,
            start,
            end
        })
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="Modale__container">
                <form onSubmit={onSubmit}>
                    <h2 className="Modale__title">Forfaits</h2>
                    <input className="Modale__input" placeholder="Nom du forfait" value={title} onChange={e => setTitle(e.target.value)} />

                    <div className="Modale__form">

                        <div className="Modale__labelContent">
                            <label >Date de début</label>
                            <Datetime
                                dateFormat="DD/MM/YYYY"
                                value={start}
                                onChange={date => setStart(date)}
                            />


                        </div>

                        <div className="Modale__labelContent">
                            <label>Date de fin</label>

                            <Datetime
                                value={end}
                                onChange={date => setEnd(date)}
                            />
                        </div>

                    </div>

                    {/* add event */}
                    <div className="Modale__buttonContent">
                        <button className="Modale__button">Ajouter un forfait</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ModalCalendar;