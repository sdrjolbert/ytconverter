import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/ui/Footer";

export default async function Home() {
  let info = [];

  try {
    const res = await fetch("http://localhost:3000/api/get-info", {
      method: "GET",
      headers: { "YT-Url": "https://www.youtube.com/watch?v=g5lA4RNFT3I" },
    });
    if (!res.ok) {
      throw new Error(`Não foi possível se conectar com a API!`);
    }

    const { formats } = await res.json();
    info = formats;
  } catch (err) {
    console.error(`ERROR: ${err}`);
    return;
  }

  return (
    <div>
      <header>
        <section>
          <div>
            <Image
              src="/ytdownloader-logo.svg"
              width={32}
              height={32}
              alt="Isotipo do Projeto YouTube Downloader"
            />
          </div>

          <h1>YT Downloader</h1>
        </section>

        <section>
          <ul>
            <li>
              <Link
                legacyBehavior
                href="/converter"
              >
                <a target="_blank">Conversor para mp3</a>
              </Link>
            </li>
          </ul>
        </section>
      </header>

      <main>
        <section>
          <div>
            <div>
              <input
                type="text"
                placeholder="Link do YouTube"
              />
              <label>Link do YouTube</label>
            </div>

            <div>
              <button type="submit">Baixar</button>
            </div>
          </div>

          <div>
            {info.map((format) => {
              return (
                <div key={format.itag}>
                  <div key={format.qualityLabel}>
                    {Object.entries(format).map(([atr, value]) => {
                      return (
                        <div key={atr}>
                          <span>
                            {atr}:{" "}
                            {typeof value === "boolean" ? String(value) : value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <br></br>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <p>
            O YT Downloader é uma ferramenta poderosa e prática projetada para
            facilitar o download de vídeos do YouTube, permitindo que os
            usuários acessem seu conteúdo favorito de maneira simples e rápida.
            Com uma interface amigável, o YT Downloader oferece a possibilidade
            de baixar vídeos em diversas resoluções, que variam desde 144p,
            ideal para conexões mais lentas, até impressionantes 4K, para
            aqueles que buscam a melhor qualidade de imagem. Além de realizar
            downloads, o YT Downloader também permite a conversão de vídeos em
            arquivos de áudio através do{" "}
            <Link
              legacyBehavior
              href="#"
            >
              <a target="_blank">YT MP3 Converter</a>
            </Link>
            , transformando seus clipes preferidos em músicas no formato MP3.
            Essa funcionalidade é perfeita para quem deseja ouvir músicas ou
            podcasts sem precisar de uma conexão constante com a internet.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
