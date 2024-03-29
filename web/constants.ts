export const API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

export const muscleGroupOptions: { name: string; value: string; id: number }[] =
  [
    { name: 'Chest', value: 'Chest', id: 1 },
    { name: 'Shoulder', value: 'Shoulder', id: 2 },
    { name: 'Back', value: 'Back', id: 3 },
    { name: 'Bicep', value: 'Bicep', id: 4 },
    { name: 'Tricep', value: 'Tricep', id: 5 },
    { name: 'Quad', value: 'Quad', id: 6 },
    { name: 'Hamstring', value: 'Hamstring', id: 7 },
    { name: 'Calf', value: 'Calf', id: 8 },
    { name: 'Glute', value: 'Glute', id: 9 },
    { name: 'Abs', value: 'Abs', id: 10 },
    { name: 'Core', value: 'Core', id: 11 },
  ];

export const equipmentOptions: { name: string; value: string; id: number }[] = [
  { name: 'Full', value: 'Full', id: 1 },
  { name: 'Basic', value: 'Basic', id: 2 },
  { name: 'None', value: 'None', id: 3 },
];
