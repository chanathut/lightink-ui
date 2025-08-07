import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Lightink - AI-Powered Manuscript Analysis',
  description: 'Transform your manuscript with professional AI analysis. Get actionable insights, revision roadmaps, and data-driven feedback to elevate your writing.',
  keywords: 'manuscript analysis, writing feedback, AI editing, book editing, developmental editing, writing coach',
  authors: [{ name: 'Lightink Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2D3748',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Museo:wght@300;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-white min-h-screen">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}