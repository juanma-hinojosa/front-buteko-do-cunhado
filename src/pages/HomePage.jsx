import { Icon } from "@iconify/react/dist/iconify.js";
import Component from "../components/bannerComida";
import HeroSection from "../components/HeroSection";
import HeroSectionMenuComponent from "../components/HeroSectionMenuComponent";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import ResponsiveMap from "../components/mapa";

import imageButeko from "/images/buteko.png"
import Loading from "../components/Loading";
import Footer from "../components/Footer";

function HomePage() {

  const TOTAL_SECCIONES = 10;
  const [cargadas, setCargadas] = useState(0);

  useEffect(() => {
    // console.log(`Secciones cargadas: ${cargadas}/${TOTAL_SECCIONES}`);
  }, [cargadas]);

  const handleSectionLoaded = () => {
    setCargadas(prev => prev + 1);
  };

  const estaCargando = cargadas < TOTAL_SECCIONES;

  return (
    <>
      {estaCargando && <Loading />}



      <div style={{ display: estaCargando ? "none" : "block" }}>
        <Navbar />
        <HeroSection />
        <Component />
        <section
          id="hamburguer"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <HeroSectionMenuComponent
            categoria="Hamburguer"
            title="hamburguer smash 100% artesanal"
            subtitle="todos no pao brioche e porcao individual de fritas"
            onLoaded={handleSectionLoaded}
          />
        </section>

        {/* banner  */}
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://static.vecteezy.com/system/resources/previews/015/462/130/large_2x/delicious-food-group-of-young-friends-sitting-together-in-bar-with-beer-photo.jpg)`,
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: "50vh",
            display: "flex",
            alignItems: "flex-star",
            justifyContent: "flex-star",
            textAlign: "center",
            flexDirection: "row-reverse",
            padding: "20px"
          }}
        >
          <h2
            style={{ textTransform: "uppercase" }}
          >desde 2017 <br /> #comidaboaresenha</h2>
        </section>

        {/* boca de anjo  */}
        <section
          id="boca-de-anjo"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <HeroSectionMenuComponent
            categoria="Boca de Anjo"
            title="Boca de Anjo"
            subtitle="todos acompanha com fritas e molho"
            onLoaded={handleSectionLoaded}
          />
        </section>

        {/* pastel  */}
        <section
          id="pastel"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://minhasreceitinhas.com.br/wp-content/uploads/2023/05/Pastel-de-feira-caseiro-1200x692.jpg)`,
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: "50vh"
          }}
        >
          <HeroSectionMenuComponent
            categoria="Pastel"
            title="pastel"
            subtitle="* Para outros sabores confira nossa disponibilidade"
            onLoaded={handleSectionLoaded}
          />
        </section>

        {/* PORÇÕES */}
        <section
          id="porcoes"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <HeroSectionMenuComponent
            categoria="PORÇÕES"
            title="BOTEKO DO CUNHADO"
            subtitle="DESDE 2017 - #AKIÉSANTAMANÉ"
            onLoaded={handleSectionLoaded}
          />
        </section>

        {/* banner  */}
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://blog-parceiros.ifood.com.br/wp-content/uploads/2025/05/comidas-de-boteco-batata-frita.jpg)`,
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: "50vh",
            display: "flex",
            alignItems: "flex-star",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "row-reverse",
            padding: "20px"
          }}
        >
          <h2
            style={{ textTransform: "uppercase" }}
          >BOTEKO DO CUNHADO <br /> DESDE 2017 - #AKIÉSANTAMANÉ</h2>
        </section>

        {/* seccion de iscas */}
        <section
          id="iscas"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <HeroSectionMenuComponent
            categoria="Isca de Frango"
            title="ISCAS"
            subtitle="DESDE 2017 - #AKIÉSANTAMANÉ"
            onLoaded={handleSectionLoaded}
          />
        </section>


        {/* banner  */}
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://mir-s3-cdn-cf.behance.net/project_modules/1400/ac3036168041637.643400cc683a8.jpg)`,
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: "50vh",
            display: "flex",
            // alignItems: "flex-star",
            justifyContent: "space-between",
            textAlign: "center",
            flexDirection: "column",
            padding: "20px"
          }}
        >
          <h2
            style={{ textTransform: "uppercase" }}
          > BOTEKO DO CUNHADO - #SANTATEREZINHAÉLAZER
          </h2>
          <p>Aprecie com moderação.<Icon icon="uil:18-plus" /> Venda e consumo proibidos para menores de 18 anos</p>
          {/* Aprecie com moderação. Venda e consumo proibidos para menores de 18 anos */}
        </section>

        {/* seccion de peixe */}
        <section
          id="peixe"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <HeroSectionMenuComponent
            categoria="Peixe"
            title="Peixe"
            subtitle="DESDE 2017 - #MAGIADOBOTEKO"
            onLoaded={handleSectionLoaded}
          />
        </section>

        {/* review clientes */}
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${imageButeko})`,
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "column",
            padding: "20px"
          }}
        >
          <h2
            style={{ textTransform: "uppercase" }}
          > BOTEKO DO CUNHADO - #RESENHABOTEKO
          </h2>
          <p style={{ maxWidth: "800px" }}>

            Fui ao buteco com algumas amigas e simplesmente me apaixonei pelo ambiente! Desde que cheguei, senti aquela vibe acolhedora, sabe? Um clima bem familiar, com pessoas rindo, conversando e curtindo de verdade — como se todos se conhecessem há anos.
            <br />
            A música ao vivo foi um show à parte: um samba de raiz misturado com MPB que tocava o coração. A galera até arriscou uns passinhos ali perto das mesas, e foi impossível não entrar no ritmo.
            <br />
            A comida? Um espetáculo! Pedi uma porção de mandioca frita com isca e estava divina, bem temperada e servida quentinha. Também experimentei o pastel de costela — sério, queria levar uma dúzia pra casa! 😅
            <br />
            O atendimento foi outro ponto alto. Os garçons foram super simpáticos e rápidos, sempre com um sorriso no rosto.
            <br />
            No fim, saí com o coração leve, barriga cheia e a certeza de que quero voltar logo. É aquele tipo de lugar que te faz sentir em casa. Recomendo de olhos fechados!
            <br />
            ⭐⭐⭐⭐⭐

          </p>
          <span>Vitória L.</span>
        </section>

        {/* seccion platos */}
        <section
          id="pratos"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://minhasreceitinhas.com.br/wp-content/uploads/2023/05/Pastel-de-feira-caseiro-1200x692.jpg)`,
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: "50vh"
          }}
        >
          <HeroSectionMenuComponent
            categoria="Pratos"
            // title="pratos"
            subtitle="pratos"
            onLoaded={handleSectionLoaded}
          />
        </section>

        {/* drinks seccion  */}
        <section
          id="drinks"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://boguesounddistillery.com/wp-content/uploads/2019/11/How-to-order-drinks-at-a-bar-for-beginners-featured-image-01.jpg)`,
            backgroundRepeat: "none",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: "50vh"
          }}
        >
          <HeroSectionMenuComponent
            onLoaded={handleSectionLoaded}
            categoria="Drinks"
            title="drinks"
            subtitle="consulte todos os sabores disponiveis"
          />
        </section>
        <ResponsiveMap />
        {/* seccion de bebidas sin alchool */}
        <section
          id="bebidas-sem-alcool"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <HeroSectionMenuComponent
            categoria="Bebidas sem Alcool"
            title="Bebidas sem alcool"
            subtitle="ESCOLHA SUA BEBIDA"
            onLoaded={handleSectionLoaded}
          />
        </section>

        <section
          id="cerveja"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",

            // display: "flex",
            // alignItems: "flex-star",
            justifyContent: "space-between",
            textAlign: "center",
            flexDirection: "column",
            padding: "20px"
          }}
        >
          <HeroSectionMenuComponent
            categoria="Cerveja"
            title="Cerveja"
            subtitle="ESCOLHA SUA BEBIDA"
            onLoaded={handleSectionLoaded}
          />

          <p>Aprecie com moderação.<Icon icon="uil:18-plus" /> Venda e consumo proibidos para menores de 18 anos</p>

        </section>

<Footer />
      </div>
    </>
  )
}

export default HomePage;