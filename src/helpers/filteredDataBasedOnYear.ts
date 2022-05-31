export default function filteredDataBasedOnYear({
  year,
  data,
}: {
  year: number;
  data: any;
}) {
  return data
    .filter((event: any) => new Date(event.end.local).getFullYear() === year)
    .map((event: any) => {
      return { name: year.toString(), isOnline: event.online_event };
    })
    .reduce(
      (
        prev: { online: number; onsite: number },
        curr: { name: string; isOnline: boolean }
      ) => {
        return {
          name: curr.name,
          online: curr.isOnline
            ? prev.online + Number(curr.isOnline)
            : prev.online,
          onsite: !curr.isOnline
            ? prev.onsite + Number(!curr.isOnline)
            : prev.onsite,
        };
      },
      {
        online: 0,
        onsite: 0,
      }
    );
}
