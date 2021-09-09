export const dnodes=[
  {id: 'start', label: '12th', position: 'x0'},
  {id: '1', label: 'BCA', position: 'x1'},
  {id: '2', label: 'Btech', position: 'x2'},
  {id: '3', label: 'MCA', position: 'x3'},
  {id: '4', label: 'Mtech', position: 'x4'},
  {id: '5', label: 'PGP in Full stack dev', position: 'x5'},
  {id: '6', label: 'Software engineer', position: 'x6'},
  {id: '7', label: 'B. Pharma', position: 'x7'},
  {id: '8', label: 'Full stack developer', position: 'x8'},
  {id: '9', label: 'Chemical engineer', position: 'x8'}

];
export const dlinks= [
  {source: 'start', target: '1', label: 'Process#1'},
  {source: 'start', target: '2', label: 'Process#2'},
  {source: 'start', target: '7', label: 'Process#7'},
  {source: '1', target: '3', label: 'Process#3'},
  {source: '2', target: '4', label: 'Process#4'},
  {source: '2', target: '6', label: 'Process#6'},
  {source: '3', target: '5', label:'after this'},
  {source: '5', target: '8', label:'after this'},
  {source: '3', target: '6', label:'after this'},
  {source: '7', target: '9', label:'after this'}


];
