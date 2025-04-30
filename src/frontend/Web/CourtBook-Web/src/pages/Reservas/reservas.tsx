import { JSX } from "react";
import { CardReservation } from "../../components/CardReservation/Card";

export const Reservas = (): JSX.Element => {
  const data = [
    {
      _id: "681223ea16cqfdgetj175c5b4c934ac",
      userId: "68111082a22f1db24a62b08f",
      courtId: "68111082a22f1db24a6",
      date: "2025-04-30",
      time: "13:00",
      status: "agendado",
      reservationPrice: 80,
      user: {
        id: "68111082a22f1db24a62b08f",
        nomeCompleto: "Pedro Nogueira",
        nomeUsuario: "pedro",
        email: "pedroffn209@gmail.com",
        perfil: 0,
      },
    },
    {
      _id: "681223ea16c175c676ujyhgfnhd5b4c934ac",
      userId: "68111082a22f1db24a62b08f",
      courtId: "68111082a22f1db24a6",
      date: "2025-04-30",
      time: "13:00",
      status: "agendado",
      reservationPrice: 80,
      user: {
        id: "68111082a22f1db24a62b08f",
        nomeCompleto: "Pedro Nogueira",
        nomeUsuario: "pedro",
        email: "pedroffn209@gmail.com",
        perfil: 0,
      },
    },
    {
      _id: "681223ea16htjic175c5b4c934ac",
      userId: "68111082a22f1db24a62b08f",
      courtId: "68111082a22f1db24a6",
      date: "2025-04-30",
      time: "13:00",
      status: "agendado",
      reservationPrice: 80,
      user: {
        id: "68111082a22f1db24a62b08f",
        nomeCompleto: "Pedro Nogueira",
        nomeUsuario: "pedro",
        email: "pedroffn209@gmail.com",
        perfil: 0,
      },
    },
    {
      _id: "681223ea153t36c175c5b4c934ac",
      userId: "68111082a22f1db24a62b08f",
      courtId: "68111082a22f1db24a6",
      date: "2025-04-30",
      time: "13:00",
      status: "agendado",
      reservationPrice: 80,
      user: {
        id: "68111082a22f1db24a62b08f",
        nomeCompleto: "Pedro Nogueira",
        nomeUsuario: "pedro",
        email: "pedroffn209@gmail.com",
        perfil: 0,
      },
    },
    {
      _id: "681223ea1dds6c175c5b4c934ac",
      userId: "68111082a22f1db24a62b08f",
      courtId: "68111082a22f1db24a6",
      date: "2025-04-30",
      time: "13:00",
      status: "agendado",
      reservationPrice: 80,
      user: {
        id: "68111082a22f1db24a62b08f",
        nomeCompleto: "Pedro Nogueira",
        nomeUsuario: "pedro",
        email: "pedroffn209@gmail.com",
        perfil: 0,
      },
    },
  ];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",

          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        {data.map((reservation) => (
          <CardReservation key={reservation._id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};
