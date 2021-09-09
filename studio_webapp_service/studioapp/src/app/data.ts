export const nodes=[
  {id: 'start', label: '12th',},
  {id: '1', label: 'BCA'},
  {id: '2', label: 'Btech'},
  {id: '3', label: 'MCA'},
  {id: '4', label: 'Mtech'},
  {id: '5', label: 'PGP in Full stack dev'},
  {id: '6', label: 'Software engineer'},
  {id: '7', label: 'B. Pharma'},
  {id: '8', label: 'Full stack developer'},
  {id: '9', label: 'Chemical engineer'}

];
export const links= [
  {source: 'start', target: '1'},
  {source: 'start', target: '2', },
  {source: 'start', target: '7', },
  {source: '1', target: '3', },
  {source: '2', target: '4', },
  {source: '2', target: '6', },
  {source: '3', target: '5', },
  {source: '5', target: '8', },
  {source: '3', target: '6', },
  {source: '7', target: '9', }


];