export type TypeBookingCal = {
  id: number;
  eventTypeId: number;
  user: {
    email: string;
  };
  attendees: [
    {
      name: string;
      email: string;
    },
  ];
  status: string;
  responses: {
    "como-posso-ajudar": string;
  };
  startTime: Date;
  endTime: Date;
};

export type TypeBooking = {
  externalId: number;
  externalEventId: number;
  hostEmail: string;
  attendeeName: string;
  attendeeEmail: string;
  status: string;
  requestMessage: string;
  startTime: Date;
  endTime: Date;
};
