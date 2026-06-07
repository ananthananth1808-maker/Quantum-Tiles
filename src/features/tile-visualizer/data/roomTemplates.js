import { Sofa, BedDouble, ChefHat, Bath } from 'lucide-react';

export const roomTemplates = [
  {
    id: 'living-room',
    label: 'Living Room',
    icon: 'Sofa',
    description: 'Open plan living space with large floor area',
    dimensions: { width: 6, height: 4, depth: 5 },
    wallColor: '#1e293b',
    ceilingColor: '#0f172a',
    ambientIntensity: 0.6,
    thumbnail: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=400&q=80',
    svgProps: {
      floorWidth: 420, floorHeight: 220,
      wallWidth: 420, wallHeight: 160,
    },
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    icon: 'BedDouble',
    description: 'Cosy bedroom with warm ambient light',
    dimensions: { width: 5, height: 3, depth: 4 },
    wallColor: '#1a1f35',
    ceilingColor: '#0d1117',
    ambientIntensity: 0.4,
    thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80',
    svgProps: {
      floorWidth: 360, floorHeight: 180,
      wallWidth: 360, wallHeight: 130,
    },
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: 'ChefHat',
    description: 'Modern kitchen with splash-back wall tiles',
    dimensions: { width: 4, height: 3, depth: 3 },
    wallColor: '#1c2a1e',
    ceilingColor: '#0f1410',
    ambientIntensity: 0.8,
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    svgProps: {
      floorWidth: 320, floorHeight: 160,
      wallWidth: 320, wallHeight: 150,
    },
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: 'Bath',
    description: 'Luxury spa bathroom with full tile coverage',
    dimensions: { width: 3, height: 3, depth: 3 },
    wallColor: '#1a2535',
    ceilingColor: '#0d1520',
    ambientIntensity: 0.5,
    thumbnail: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=400&q=80',
    svgProps: {
      floorWidth: 280, floorHeight: 140,
      wallWidth: 280, wallHeight: 180,
    },
  },
];

export const getRoomById = (id) => roomTemplates.find(r => r.id === id) || roomTemplates[0];
