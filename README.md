# Modern Webpage

A modern, responsive webpage built with React, TypeScript, and Tailwind CSS. Features a component-based architecture for easy maintenance and customization.

## Features

- ⚡ **Modern Tech Stack**: React 18 + TypeScript + Tailwind CSS
- 📱 **Responsive Design**: Looks great on all devices
- 🧩 **Component-Based**: Modular, reusable components
- 🎨 **Easy to Customize**: Clean, well-organized code structure
- 🛡️ **Type Safe**: Full TypeScript support
- 🔍 **SEO Friendly**: Semantic HTML and proper structure

## Project Structure

```
src/
├── components/
│   ├── Header/
│   │   └── Header.tsx
│   ├── Hero/
│   │   └── Hero.tsx
│   ├── Features/
│   │   └── Features.tsx
│   └── Footer/
│       └── Footer.tsx
├── types/
│   └── index.ts
├── App.tsx
├── index.tsx
└── index.css
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Customization

### Editing Content

All content is easily editable through the main `App.tsx` file:

- **Navigation**: Update the `navItems` array
- **Hero Section**: Modify the `heroData` object
- **Features**: Edit the `featuresData` array
- **Footer**: Update props passed to the Footer component

### Styling

- **Colors**: Customize the color palette in `tailwind.config.js`
- **Typography**: Update fonts in `index.html` and `tailwind.config.js`
- **Components**: Modify component styles directly in their respective files

### Adding New Sections

1. Create a new component in the `src/components/` directory
2. Define TypeScript interfaces in `src/types/index.ts`
3. Import and use the component in `App.tsx`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **Create React App**: Development and build tooling

## License

MIT License - feel free to use this project for your own purposes!
