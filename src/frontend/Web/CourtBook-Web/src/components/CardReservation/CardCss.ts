import styled from "styled-components";

export const CardContainer = styled.div`
  background: #f0f4f8;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #d0d7de;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s ease-in-out;
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: #1f2937;
`;

export const CardText = styled.p`
  margin: 0;
  color: #4b5563;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 1rem;
`;

export const Button = styled.button<{ variant: "cancel" | "confirm" }>`
  flex: 1;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.variant === "cancel" ? "#ef4444" : "#22c55e"};

  &:hover {
    background-color: ${(props) =>
      props.variant === "cancel" ? "#dc2626" : "#16a34a"};
  }

  &:active {
    transform: scale(0.97);
  }
`;
