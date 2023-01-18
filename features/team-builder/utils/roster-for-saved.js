export function getRosterForSaved(props) {
  const batters = [
    {
      position: "Catcher",
      player: props?.data?.catcher,
    },
    {
      position: "First Base",
      player: props?.data?.first_base,
    },
    {
      position: "Second Base",
      player: props?.data?.second_base,
    },
    {
      position: "Third Base",
      player: props?.data?.third_base,
    },
    {
      position: "Short Stop",
      player: props?.data?.short_stop,
    },
    {
      position: "Left Field",
      player: props?.data?.left_field,
    },
    {
      position: "CenterField",
      player: props?.data?.center_field,
    },
    {
      position: "Right Field",
      player: props?.data?.right_field,
    },
    {
      position: "Bench 1",
      player: props?.data?.bench_1,
    },
    {
      position: "Bench 2",
      player: props?.data?.bench_2,
    },
    {
      position: "Bench 3",
      player: props?.data?.bench_3,
    },
    {
      position: "Bench 4",
      player: props?.data?.bench_4,
    },
    {
      position: "Bench 5",
      player: props?.data?.bench_5,
    },
  ];

  const starters = [
    {
      position: "Starter 1",
      player: props?.data?.starter_1,
    },
    {
      position: "Starter 2",
      player: props?.data?.starter_2,
    },
    {
      position: "Starter 3",
      player: props?.data?.starter_3,
    },
    {
      position: "Starter 4",
      player: props?.data?.starter_4,
    },
    {
      position: "Starter 5",
      player: props?.data?.starter_5,
    },
  ];

  const bullpen = [
    {
      position: "Bullpen 1",
      player: props?.data?.bullpen_1,
    },
    {
      position: "Bullpen 2",
      player: props?.data?.bullpen_2,
    },
    {
      position: "Bullpen 3",
      player: props?.data?.bullpen_3,
    },
    {
      position: "Bullpen 4",
      player: props?.data?.bullpen_4,
    },
    {
      position: "Bullpen 5",
      player: props?.data?.bullpen_5,
    },
    {
      position: "Bullpen 6",
      player: props?.data?.bullpen_6,
    },
    {
      position: "Bullpen 7",
      player: props?.data?.bullpen_7,
    },
    {
      position: "Bullpen 8",
      player: props?.data?.bullpen_8,
    },
  ];

  return {batters, starters, bullpen};
}