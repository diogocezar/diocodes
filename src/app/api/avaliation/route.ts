type AvaliationResponse = {
  id: number;
  attendees: string;
  startTime: string;
  endTime: string;
  email: string;
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
    next: { revalidate: 120 },
  });
  const data = await result.json();
  const { bookings } = data;
  const filteredData = bookings.filter(
    (item: any) =>
      item.eventTypeId === eventId &&
      item.status !== "CANCELLED" &&
      new Date(item.endTime) < new Date(),
  );
  const resData = filteredData.map((item: any): AvaliationResponse => {
    return {
      id: item.id,
      attendees: reduceName(item.attendees[0].name),
      startTime: item.startTime,
      endTime: item.endTime,
      email: item.attendees[0].email,
    };
  });
  const resDataOrdered = resData.sort(
    (a: AvaliationResponse, b: AvaliationResponse) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    },
  );
  const resDataOrderedFiltered = resDataOrdered.filter(
    (item: AvaliationResponse, index: number, self: AvaliationResponse[]) =>
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
