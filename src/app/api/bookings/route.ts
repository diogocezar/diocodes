type BookingsResponse = {
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
  const API_KEY_CALL = process.env.API_KEY_CALL;
  const URL = "https://api.cal.com/v1/bookings";
  const eventId = 634170; // Event ID for Diocodes
  const result = await fetch(`${URL}?apiKey=${API_KEY_CALL}`, {
    next: { revalidate: 1 },
  });
  const data = await result.json();
  const { bookings } = data;
  const filteredData = bookings.filter(
    (item: any) => item.eventTypeId === eventId,
  );
  const resData = filteredData.map((item: any): BookingsResponse => {
    const isActive = new Date(item.endTime) > new Date();
    return {
      attendees: reduceName(item.attendees[0].name),
      startTime: item.startTime,
      endTime: item.endTime,
      isActive,
    };
  });
  const resDataOrdered = resData.sort(
    (a: BookingsResponse, b: BookingsResponse) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    },
  );
  return new Response(JSON.stringify(resDataOrdered));
};
