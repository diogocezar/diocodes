type BookingResponse = {
  attendees: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

const reduceName = (name: string): string => {
  if (name.length > 20) {
    const nameArray = name.split(" ");
    return `${nameArray[0]} ${nameArray[nameArray.length - 1]}`;
  }
  return name;
};

export const GET = async () => {
  const API_KEY_CALL = process.env.API_CAL;
  const URL = "https://api.cal.com/v1/bookings";
  const eventId = 634170; // Event ID for Diocodes
  const result = await fetch(`${URL}?apiKey=${API_KEY_CALL}`, {
    next: { revalidate: 120 },
  });
  const data = await result.json();
  const { bookings } = data;
  const filteredData = bookings.filter(
    (item: any) => item.eventTypeId === eventId && item.status !== "CANCELLED",
  );
  const resData = filteredData.map((item: any): BookingResponse => {
    const isActive = new Date(item.endTime) > new Date();
    return {
      attendees: reduceName(item.attendees[0].name),
      startTime: item.startTime,
      endTime: item.endTime,
      isActive,
    };
  });
  const resDataOrdered = resData.sort(
    (a: BookingResponse, b: BookingResponse) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    },
  );
  const resDataOrderedFiltered = resDataOrdered.filter(
    (item: BookingResponse, index: number, self: BookingResponse[]) =>
      index ===
      self.findIndex(
        (t) =>
          t.attendees === item.attendees &&
          t.startTime === item.startTime &&
          t.endTime === item.endTime,
      ),
  );
  return new Response(JSON.stringify(resDataOrderedFiltered));
};
