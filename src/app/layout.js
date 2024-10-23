export const metadata = {
  title: "YT Downloader",
  description:
    "Aplicação Web com foco no download de vídeos e áudios do YouTube.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
