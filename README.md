# Facebook Automation Tool

A web-based tool for automating Facebook group interactions, including posting to groups, auto-joining groups, and scheduling content.

## Features

- **Group Management**: Join, leave, and manage Facebook groups
- **Auto-Posting**: Schedule posts to multiple Facebook groups
- **Bulk Join**: Automatically join groups based on keywords and categories
- **Content Scheduling**: Create and schedule posts with customizable timing
- **Content Variation**: Use spintax for creating unique variations of your content
- **Analytics**: Track your group engagement and post performance

## Deployment

This project is ready for Netlify deployment:

1. Build the project with `npm run build` or `pnpm run build`
2. The generated `dist` folder can be deployed to Netlify via drag-and-drop
3. Alternatively, connect your GitHub repository to Netlify for CI/CD

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Technologies Used

- React
- Tailwind CSS
- Vite

## Important Note

This is a frontend demonstration tool. In a production environment, you would need to:

1. Implement proper Facebook API integration
2. Add server-side functionality for scheduling and automation
3. Implement proper authentication and security measures

## License

MIT
