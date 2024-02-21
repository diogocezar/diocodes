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
    (item: any) => item.eventTypeId === eventId,
  );
  const responseDate = filteredData.map((item: any) => {
    return {
      attendees: item.attendees[0].name,
      startTime: item.startTime,
      endTime: item.endTime,
    };
  });
  return new Response(JSON.stringify(responseDate));
};
