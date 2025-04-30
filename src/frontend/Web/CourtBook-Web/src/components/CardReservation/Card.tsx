import React from "react";
import { CardReservationProps } from "../../interfaces/reservation.interface";
import {
  CardContainer,
  CardTitle,
  CardText,
  ButtonGroup,
  Button,
} from "./CardCss";

export const CardReservation: React.FC<CardReservationProps> = ({
  reservation,
}) => {
  const formattedDate = new Date(
    reservation.date + "T00:00:00"
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <CardContainer>
      <CardTitle>{reservation.user.nomeCompleto}</CardTitle>
      <CardText>
        {formattedDate} - {reservation.time}
      </CardText>
      <CardText>Status: {reservation.status}</CardText>
      <CardText>Preço: R$ {reservation.reservationPrice}</CardText>

      <ButtonGroup>
        <Button variant="cancel">Cancelar</Button>
        <Button variant="confirm">Concluído</Button>
      </ButtonGroup>
    </CardContainer>
  );
};
